import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function Modal({ title, saveText = "save", onSave = () => {}, open = false, onOpenChange = () => {}, desc = "", children }) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">{children}</div>
				<DialogFooter>
					<Button onClick={onSave} type="submit">
						{saveText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
