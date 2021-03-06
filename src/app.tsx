import { Button, TextareaAutosize, TextField } from "@mui/material";
import { useState } from "react";

export const createDOMFromString = (str: string) => {
	var wrapper = document.createElement("div");
	wrapper.innerHTML = str;
	return wrapper;
};
export const extractElementAttributes = (element: HTMLElement) => {
	let attrs = element.attributes;
	let data: any = {};
	for (var i = 0; i < attrs.length; i++) {
		data[attrs[i].name] = attrs[i].value;
	}

	return data;
};
function getStylesWithoutDefaults(element: HTMLElement) {
	// creating an empty dummy object to compare with
	var dummy = document.createElement(element.tagName);
	document.body.appendChild(dummy);

	// getting computed styles for both elements
	var defaultStyles = getComputedStyle(dummy);
	var elementStyles = getComputedStyle(element);

	// calculating the difference
	var diff: any = {};
	for (var key in elementStyles) {
		if (
			elementStyles.hasOwnProperty(key) &&
			defaultStyles[key] !== elementStyles[key]
		) {
			diff[key] = elementStyles[key];
		}
	}

	// clear dom
	dummy.remove();

	return diff;
}

export const generateJSONDataFromDOM = (dom: HTMLElement) => {
	let counter = 0;
	let data = [];
	const addChildren = (childNodes: NodeList) => {
		let ids: any[] = [];
		childNodes.forEach((node) => {
			if (node instanceof HTMLElement) {
				let childId = ++counter;
				ids.push(childId);
				data.push({
					id: childId,
					type: node.tagName.toLowerCase(),
					attributes: extractElementAttributes(node),
					children: addChildren(node.childNodes),
				});
			} else {
				let text = node.nodeValue
					?.toString()
					?.trim()
					?.replaceAll(/\n\t/g, "");
				if (text) {
					let childId = ++counter;
					ids.push(childId);
					data.push({
						id: childId,
						type: "text",
						value: text,
					});
				}
			}
		});
		return ids;
	};

	data.push({
		type: dom.tagName.toLowerCase(),
		id: counter,
		attributes: extractElementAttributes(dom),
		children: addChildren(dom.childNodes),
	});
	return data;
};

export function App() {
	let [jsonValue, setJsonValue] = useState("");
	let onChange = (e) => {
		let value = e.target.value;
		const root = createDOMFromString(value);
		try {
			console.log("root", root);
			let jsonData = generateJSONDataFromDOM(root).sort((a, b) =>
				a.id > b.id ? 1 : -1
			);
			console.log("jsonData", jsonData);

			setJsonValue(JSON.stringify(jsonData, null, 2));
		} catch (e) {
			console.warn(e);
		}
	};

	return (
		<>
			<h3>HTML to Flat JSON</h3>
			<div>
				<TextareaAutosize
					onChange={onChange}
					placeholder="input HTML here"
					minRows={30}
					maxRows={30}
					style={{ width: "100%" }}
				/>
			</div>
			<div>
				<TextareaAutosize
					placeholder="JSON output"
					minRows={30}
					maxRows={30}
					style={{ width: "100%" }}
					value={jsonValue}
				/>
			</div>
		</>
	);
}
