"use client";

import TableList from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Modal from "@/components/Modal/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function PixelList() {
	const [pixelList, setPixelList] = useState([]);

	const [keys, setKeys] = useState([]);
	const [values, setValues] = useState([]);
	const [createPixelModalStatus, setCreatePixelModalStatus] = useState(false);
	const [pixelPayload, setPixelPayload] = useState({
		name: "",
	});

	useEffect(() => {
		axios.get("https://go-microservice-k2dn.onrender.com/pixel/list?page=1&size=10").then((res) => {
			console.log(res.data);
			setPixelList(res.data);
			setKeys([
				{ label: "Id", key: "_id" },
				{ label: "Name", key: "name" },
				{ label: "Hits", key: "count" },
				{ label: "Date Created", key: "date_created" },
				{ label: "Date Updated", key: "last_updated" },
				{ label: "user", key: "user_id" },
			]);
		});
	}, []);

	async function onPixelSave() {
		if (!pixelPayload.name) {
			toast.error("Name is required");
			return;
		}

		try {
			await axios.post("https://go-microservice-k2dn.onrender.com/pixel", pixelPayload);
			toast.success("Pixel Saved");
		} catch (error) {
			toast.error(error.message);
		}
		closePixelSaveModal();
	}

	function closePixelSaveModal() {
		setCreatePixelModalStatus(false);
	}

	function getPixelTag(pixelID) {
		return `<img src="https://go-microservice-k2dn.onrender.com/pixel/${pixelID}" />`;
	}

	return (
		<div className="">
			<Toaster />
			<Modal onSave={onPixelSave} title={"Create New Pixel"} onOpenChange={setCreatePixelModalStatus} open={createPixelModalStatus}>
				<Label>Name</Label>
				<Input placeholder="Pixel Name" value={pixelPayload.name} onChange={(e) => setPixelPayload({ ...pixelPayload, name: e.target.value })} />
			</Modal>
			<div className={styles.topButtonContainer}>
				<Button onClick={() => setCreatePixelModalStatus(true)} variant="outline">
					Create New Pixel
				</Button>
			</div>
			<div className={styles.tableContainer}>
				<TableList
					actions={[
						{
							label: "Copy Capture-Tag",
							handler: (e) => {
								const pixelTag = getPixelTag(e._id);
								navigator.clipboard.writeText(pixelTag);
								toast.success("Copied to clipboard");
							},
						},

						// Add more actions as needed
					]}
					keys={keys}
					valueList={pixelList}
				/>
			</div>
		</div>
	);
}
