// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import Input from "@components/ui/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Switch } from "@headlessui/react";
import { makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";
import { useDebounce } from "usehooks-ts";
import store from "store2";
import { useTranslation } from "react-i18next";

const StreamPage: React.FC = () => {
	const { t } = useTranslation();
	const [enabled, setEnabled] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [streamKey, setStreamKey] = useState<string>("");
	const [vodSetting, setVodSetting] = useState<number>(0);

	const debouncedValue = useDebounce<boolean>(enabled, 500);
	const isInitialRender = useRef(true);

	useEffect(() => {
		if (!isInitialRender.current) {
			(async () => {
				try {
					const { success, message } = await makeRequest(
						"post",
						ep.vodSetting,
						{
							is_past: enabled ? 1 : 0,
							userID: store.get("id"),
						}
					);

					if (!success) {
						toast.error(message);
					}
				} catch (error) {
					if (error?.name === "AbortError") {
						console.log("Request aborted");
					}
				}
			})();
		} else {
			isInitialRender.current = false;
		}
	}, [debouncedValue]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const { success, data, message } = await makeRequest(
					"get",
					ep.getStreamInfo,
					{
						userID: store.get("id"),
					},
					{ signal }
				);

				if (success) {
					setStreamKey(data?.streamKey);
					setVodSetting(data?.showpast);
					setEnabled(data?.showpast === 0 ? false : true);
				} else {
					toast.error(message);
				}
			} catch (error) {
				if (error?.name === "AbortError") {
					console.log("Request aborted");
				}
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const handleCopyToClipboard = () => {
		navigator.clipboard
			.writeText(streamKey)
			.then(() => toast.success("Stream Key copied successfully."))
			.catch((error) =>
				toast.error("Unable to copy text to clipboard", error)
			);
	};

	const handleOnChange = () => {
		setEnabled(!enabled);
		setVodSetting(enabled ? 0 : 1);
	};

	const handleReset = async () => {
		setLoading(true);

		try {
			await makeRequest("post", ep.updateStreamKey, {
				userID: store.get("id"),
			});

			const { success, data } = await makeRequest("get", ep.getStreamInfo, {
				userID: store.get("id"),
			});

			if (success) {
				setStreamKey(data?.streamKey);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto mt-10">
			<div className="mb-7">
				<Heading size="sm">{t("pages.psk")}</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<Label className="md:w-[280px] left-0 w-full">
						{t("pages.psk")}
					</Label>
					<div className="w-full">
						<Input
							className="flex-shrink w-full"
							value={show ? streamKey : "**********"}
							onChange={() => {}}
							// disabled
						/>
						<Button
							onClick={() => setShow(!show)}
							className="text-primary bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0"
						>
							{show ? t("pages.hide") : t("pages.show")}
						</Button>
					</div>
					<div className="flex gap-2 justify-start md:justify-end">
						<Button color="primary" onClick={handleCopyToClipboard}>
							{t("pages.copy")}
						</Button>
						<Button
							color="default"
							onClick={handleReset}
							disabled={loading}
						>
							{loading ? "Loading..." : t("pages.reset")}
						</Button>
					</div>
				</div>
			</div>

			<div>
				<Heading size="sm">{t("pages.vdset")}</Heading>
				<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2 flex flex-col md:flex-row gap-2 w-full">
					<Label className="md:w-[240px] left-0 w-full">
						{t("pages.spb")}
					</Label>
					<div className="w-full">
						<div>
							<Switch
								checked={vodSetting === 1 ? true : false}
								onChange={handleOnChange}
								className={`${
									vodSetting === 1
										? "bg-primary"
										: "bg-background-base"
								}
                                  relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
							>
								<span className="sr-only">Use setting</span>
								<span
									aria-hidden="true"
									className={`${
										vodSetting === 1
											? "translate-x-6"
											: "translate-x-0"
									}
                                    pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className="mt-1">{t("pages.spbd")}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StreamPage;
