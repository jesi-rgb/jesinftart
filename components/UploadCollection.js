import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContractFunction, useEthers } from "@usedapp/core";
import MintButton from "@/components/MintButton";

import {
  COLLECTION_MANAGER_ADDRESS,
  APPROVED_ADDRESSES_FOR_UPLOADING,
} from "@/lib/utils";

export default function UploadCollection({ slug }) {
  //   const router = useRouter();
  //   const { contract, tokenId } = router.query;

  const { account, chainId, activateBrowserWallet, deactivate, error } =
    useEthers();
  const isConnected = account !== undefined;
  console.log(account, chainId, activateBrowserWallet, deactivate, error);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("hello", data);
  };

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
          <label>
            <input type="submit" />
          </label>
        </form>
      ) : (
        <div> NOT AUTHORISED</div>
      )}
    </>
  );
}
