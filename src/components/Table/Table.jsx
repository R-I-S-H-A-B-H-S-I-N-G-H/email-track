import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export default function TableList({ keys, valueList, actions }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{keys.map(({ key, label }) => (
						<TableHead key={key}>{label}</TableHead>
					))}
					{actions && Array.isArray(actions) && actions.length > 0 && <TableHead>Actions</TableHead>}
				</TableRow>
			</TableHeader>
			<TableBody>
				{valueList.map((item) => (
					<TableRow key={item._id}>
						{keys.map(({ key }, index) => (
							<TableCell key={item._id + index + "data1"}>{item[key]}</TableCell>
						))}

						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<span className="sr-only">Open menu</span>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								{actions && Array.isArray(actions) && actions.length > 0 && (
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Actions</DropdownMenuLabel>

										{actions.map(({ label, handler = () => {} }, index) => (
											<DropdownMenuItem key={item._id + index + "data2"} onClick={() => handler(item)}>
												{label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								)}
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
