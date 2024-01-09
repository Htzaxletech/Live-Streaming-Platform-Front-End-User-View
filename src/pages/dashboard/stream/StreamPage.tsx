import React, { useState } from "react";
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import Input from "@components/ui/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Switch } from "@headlessui/react";

const StreamPage: React.FC = () => {
	const [enabled, setEnabled] = useState(false);
	const [show, setShow] = useState(false);
	const [streamKey] = useState("copy text testing");

	const handleCopyToClipboard = () => {
		// Copy the message to the clipboard
		navigator.clipboard
			.writeText(streamKey)
			.then(() => {
				alert("copied")
				console.log("Text copied to clipboard:", streamKey);
				// You can provide user feedback here if needed
			})
			.catch((error) => {
				console.error("Unable to copy text to clipboard", error);
				// Handle error or provide user feedback
			});
	};

	return (
		<div className="container mx-auto mt-10">
			<div className="mb-7">
				<Heading size="sm">Primary Stream Key</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<Label className="md:w-[280px] left-0 w-full">
						Primary Stream Key
					</Label>
					<div className="w-full">
						<Input
							className="flex-shrink w-full"
							value={show ? streamKey : "***"}
							readOnly
						/>
						<Button
							onClick={() => setShow(!show)}
							className="text-primary bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0"
						>
							{show ? "Hide" : "Show"}
						</Button>
					</div>
					<div className="flex gap-2 justify-start md:justify-end">
						<Button color="primary" onClick={handleCopyToClipboard}>
							Copy
						</Button>
						<Button color="default">Reset</Button>
					</div>
				</div>
			</div>

			<div>
				<Heading size="sm">VOD Settings</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<Label className="md:w-[240px] left-0 w-full">
						Store past broadcast
					</Label>
					<div className="w-full">
						<div>
							<Switch
								checked={enabled}
								onChange={setEnabled}
								className={`${
									enabled ? "bg-primary" : "bg-background-base"
								}
                                  relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
							>
								<span className="sr-only">Use setting</span>
								<span
									aria-hidden="true"
									className={`${
										enabled ? "translate-x-6" : "translate-x-0"
									}
                                    pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className="mt-1">
							Automatically save broadcasts for up to 7 days
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StreamPage;
