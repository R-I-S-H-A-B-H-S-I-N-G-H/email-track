"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPixelTag } from "@/utils/pixelUtil";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function EmailIdPage(props) {
	const pixelId = props.params.emailId;
	const [emailPayload, setEmailPayload] = useState({
		from: "rishabhsingh2305@gmail.com",
		to: "",
		subject: "",
		message: "",
	});

	const router = useRouter();

	function getEmailPayload() {
		return { from: emailPayload.from, to: emailPayload.to, subject: emailPayload.subject, body: getEmailTemplateWithPixel(emailPayload.message, pixelId) };
	}

	function verifyEmailPayload(emailPayload) {
		if (!emailPayload.from) throw new Error("From is required");
		if (!emailPayload.to) throw new Error("Email is required");
		if (!emailPayload.subject) throw new Error("Subject is required");
		if (!emailPayload.message) throw new Error("Message is required");
	}
	async function sendEmail() {
		try {
			verifyEmailPayload(emailPayload);
			await axios.post("https://go-microservice-k2dn.onrender.com/mail/send", getEmailPayload());
			toast.success("Email sent successfully");
			toast.message("Redirecting to pixel list");
			goToPixelList();
		} catch (error) {
			toast.error(error.message);
		}
	}

	function goToPixelList() {
		router.push("/pixel/list");
	}

	function getEmailTemplateWithPixel(message, pixelId) {
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			${getPixelTag(pixelId)}
		</head>
		<body>
			${message}
		</body>
		</html>`;
	}

	return (
		<>
			<Toaster />
			<div className="p-4 flex flex-col gap-4">
				<div className="text-3xl font-bold">Send Tracked Email</div>
				<div>
					<Label>Email</Label>
					<Input placeholder="Email" onChange={(e) => setEmailPayload({ ...emailPayload, to: e.target.value })} />
				</div>

				<div>
					<Label>Subject</Label>
					<Input placeholder="Subject" onChange={(e) => setEmailPayload({ ...emailPayload, subject: e.target.value })} />
				</div>
				<div>
					<Label>Message</Label>
					<Textarea className="min-h-80" placeholder="Enter you message here..." onChange={(e) => setEmailPayload({ ...emailPayload, message: e.target.value })} />
				</div>
				<Button onClick={sendEmail}>Send</Button>
			</div>
		</>
	);
}
