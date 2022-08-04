import { useForm } from "react-hook-form";
import { useContractFunction, useEthers } from "@usedapp/core";
import { useState, useEffect } from "react";
import LoadingPing from "./LoadingPing";
import SuccessAlert from "./SucessAlert";

import {
  COLLECTION_MANAGER_ADDRESS,
  APPROVED_ADDRESSES_FOR_UPLOADING,
  CollectionManagerContract,
  WEB_URI,
  IPFS_PREFIX,
} from "@/lib/utils";

export default function UploadCollection({ slug }) {
  const { account, chainId, activateBrowserWallet, deactivate, error } =
    useEthers();
  const isConnected = account !== undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Creation function
  const tx_name = "Create Collection";
  const { send: creationSend, state: creationState } = useContractFunction(
    CollectionManagerContract,
    "createCollection",
    { transactionName: tx_name }
  );

  const [pushJsonToIpfs, setPushJsonToIpfs] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    const uploadToIpfs = async () => {
      let json = {
        name: data.Name,
        symbol: data.Symbol,
        description: data.Description,
        external_link: WEB_URI,
        p5: IPFS_PREFIX + data.IpfsHash,
        image: IPFS_PREFIX + data.IpfsHash + "/thumbnail.png",
        seller_fee_basis_points: 100,
        fee_recipient: COLLECTION_MANAGER_ADDRESS,
        maxSupply: data.MaxSupply,
        mintFee: data.MintFee,
      };

      const ipfs_response = await fetch(`/api/jsonToIpfs`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let collectionUriHash = (await ipfs_response.json())["IpfsHash"];

      console.log(
        data.Name,
        data.Symbol,
        data.Description,
        data.IpfsHash,
        IPFS_PREFIX + collectionUriHash,
        data.MaxSupply,
        data.MintFee
      );

      creationSend(
        data.Name,
        data.Symbol,
        IPFS_PREFIX + collectionUriHash,
        data.MaxSupply,
        data.MintFee
      );

      setPushJsonToIpfs(false);
    };
    if (pushJsonToIpfs) {
      uploadToIpfs();
    }
  }, [pushJsonToIpfs]);

  const onSubmit = (formData) => {
    setData(formData);
    setPushJsonToIpfs(true);
  };

  const isMining = creationState.status === "Mining";

  return (
    <>
      {APPROVED_ADDRESSES_FOR_UPLOADING.includes(account) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name:
            <input {...register("Name", { required: true })} />
            {errors.Name?.type === "required" && "Field required"}
          </label>
          <label>
            Symbol:
            <input {...register("Symbol", { required: true })} />
            {errors.Symbol?.type === "required" && "Field required"}
          </label>
          <label>
            Description:
            <input {...register("Description", { required: true })} />
            {errors.Description?.type === "required" && "Field required"}
          </label>
          <label>
            IpfsHash:
            <input {...register("IpfsHash", { required: true })} />
            {errors.IpfsHash?.type === "required" && "Field required"}
          </label>
          <label>
            MaxSupply:
            <input
              type="number"
              {...register("MaxSupply", { required: true })}
            />
            {errors.MaxSupply?.type === "required" && "Field required"}
          </label>
          <label>
            MintFee:
            <input type="number" {...register("MintFee", { required: true })} />
            {errors.MintFee?.type === "required" && "Field required"}
          </label>
          {isMining ? (
            <div className="inline-block mx-auto space-x-3">
              <span>Creating...</span>
              <LoadingPing />
            </div>
          ) : (
            <label>
              <input type="submit" />
            </label>
          )}
        </form>
      ) : (
        <div> NOT AUTHORISED</div>
      )}
      {creationState.status === "Success" ? (
        <SuccessAlert id="hideMe" />
      ) : (
        <div></div>
      )}
    </>
  );
}
