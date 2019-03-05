var userContents = [];

function makeColumnText(content) {
	const rowStart = "[vc_column_text]";
	const rowEnd = "[/vc_column_text]";
	return rowStart + content + rowEnd;
}

function makeSection(row, title) {
	let sectionStart="[vc_tta_section title=\'%title%\' tab_id=\'%id%\']";
	const sectionEnd = "[/vc_tta_section]";

	sectionStart = sectionStart.replace("%title%", title);
	sectionStart = sectionStart.replace("%id%", generateId);
	return sectionStart + row + sectionEnd;
}

function makeColumn(section) {
	const startTag = "[vc_column]";
	const accordionSection = '[vc_tta_accordion c_icon="triangle" active_section="-1" collapsible_all="true"]'
	const accordionSectionEnd = '[/vc_tta_accordion]';
	const endTag = "[/vc_column]";
	return startTag + accordionSection + section + accordionSectionEnd + endTag;
}

function makeRow(column) {
	const startTag = "[vc_row]";
	const endTag = "[/vc_row]";
	return startTag + column + endTag;
}

function makeAllContents(contentsArray) {
	const sections = contentsArray.map(sectionContent => makeSection(makeColumnText(sectionContent.content), sectionContent.title));
	const mergedSections = sections.join("");
	const column = makeColumn(mergedSections);
	const row = makeRow(column);
	$("#output").val(row);
}

function addContent() {
	const title = $("#title_1").val();
	const content = $("#content_1").val();
	const sectionContent = new Content(title, content);
	userContents.push(sectionContent);
	makeAllContents(userContents);
}

function sayHello() {
	var title1 = $("#title_1").val();
	const content = $("#content_1").val();
	const columnText = makeColumnText(content);
	const section = makeSection(columnText, title1);
	const column = makeColumn(section);
	const row = makeRow(column);
	$("#output").val(row);
}

function Content(t, c) {
	this.title = t;
	this.content = c;
}

function generateId() {
	// Exemple:1535492271424-9b5dc045-4322 
	const part1 = Math.random().toString(36).substr(2,13);
	const part2 = Math.random().toString(36).substr(2,8);
	const part3 = Math.random().toString(36).substr(2,4);
	return part1+"_"+part2 + "_" + part3;
}

makeAllContents(userContents);

