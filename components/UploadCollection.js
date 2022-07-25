import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContractFunction, useEthers } from "@usedapp/core";
import CollectionManager from "@/contracts/CollectionManager.json";
import { useState, useEffect } from "react";
import {
  COLLECTION_MANAGER_ADDRESS,
  APPROVED_ADDRESSES_FOR_UPLOADING,
  CollectionManagerContract,
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
    "create_ntf", // TODO change for mint() when changing contract
    { transactionName: tx_name }
  );

  const onSubmit = (data) => {
    creationSend(
      data.Name,
      data.Symbol,
      data.Description,
      data.IpfsHash,
      data.MaxSupply,
      data.MintFee
    );
  };

  const isMining = mintState.status === "Mining";

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
              <span>Minting...</span>
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
