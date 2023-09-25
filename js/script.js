class MarksModel {
	constructor() {
		this.marks = [
			{ course: "HTML", mark: "B+" },
			{ course: "CSS", mark: "A-" },
			{ course: "JS", mark: "A" },
		];
		this.out = document.querySelector(".marks-model pre");
		this.updateBlock();
	}
	getMarks() {
		return this.marks;
	}
	addMark(data) {
		this.marks.push(data);
		this.updateBlock();
	}
	updateBlock() {
		this.out.innerHTML = JSON.stringify(this.marks, null, 2);
	}
}
class TimetableModel {
	constructor() {
		this.timetable = [
			{ course: "HTML", date: "Feb 01" },
			{ course: "CSS", date: "Aug 14" },
			{ course: "JS", date: "Nov 21" },
		];
		this.out = document.querySelector(".timetable-model pre");
		this.updateBlock();
	}
	getTimetable() {
		return this.timetable;
	}
	addTimetable(data) {
		this.timetable.push(data);
		this.updateBlock();
	}
	updateBlock() {
		this.out.innerHTML = JSON.stringify(this.timetable, null, 2);
	}
}
class View {
	constructor() {
		this.out = document.querySelector(".view-content");
		this.marksTemplate = `
            <h3>Marks</h3>
            <label><input class="marks-radio" type="radio" onclick="window.controller.showMarksList()" name="tabs">List</label>
            <label><input class="tile-radio" type="radio" onclick="window.controller.showTile()" name="tabs">Tile</label><br>
            {{body}}`;
		this.timetableTemplate = `
            <h3>Timetable</h3>
            {{body}}`;
		this.mixedTemplate = `
            <h3>Mixed View</h3>
            {{body}}
            <input class="new_course" type="text" placeholder="Course"><br>
            <input class="new_date" type="date"><br>
            <input class="new_mark" type="text" palceholder="mark"><br>
            <input onclick="window.controller.addItem()" type="button" value="Add mark">`;
	}
	showMarks(data) {
		let body = "<ul>";
		for (const item of data) {
			body += `<li>${item.course} - ${item.mark}</li>`;
		}
		body += "</ul>";
		this.out.innerHTML = this.marksTemplate.replace("{{body}}", body);
	}
	showMarksTile(data) {
		let body = "";
		for (const item of data) {
			body += `<div class="tile">${item.course} <br> ${item.mark}</div>`;
		}
		this.out.innerHTML = this.marksTemplate.replace("{{body}}", body);
	}
	showTimetable(data) {
		let body = "<table><tr><th>Course</th><th>Date</th></tr>";
		for (const item of data) {
			body += `<tr><td>${item.course}</td><td>${item.date}</td></tr>`;
		}
		body += "</table>";
		this.out.innerHTML = this.timetableTemplate.replace("{{body}}", body);
	}
	showMix(data) {
		let body = "<table><tr><th>Course</th><th>Date</th><th>Mark</th></tr>";
		for (const item of data) {
			body += `<tr><td>${item.course}</td><td>${item.date}</td><td>${item.mark}</td></tr>`;
		}
		body += "</table>";
		this.out.innerHTML = this.mixedTemplate.replace("{{body}}", body);
	}
}
class Controller {
	constructor() {
		this.out = document.querySelector(".controller p");
	}
	defaultAction() {
		this.showMarksList();
	}
	showMarksList() {
		window.view.showMarks(window.marksModel.getMarks());
		document.querySelector(".marks-radio").checked = true;
	}
	showTimetable() {
		window.view.showTimetable(window.timetableModel.getTimetable());
	}
	showTile() {
		window.view.showMarksTile(window.marksModel.getMarks());
		document.querySelector(".tile-radio").checked = true;
	}
	mixed() {
		let data = window.timetableModel.getTimetable();
		let mark = window.marksModel.getMarks();

		let new_data = [];
		for (let i = 0;i < data.length;i++) {
			new_data.push({
				course: data[i].course,
				date: data[i].date,
				mark: mark[i].mark,
			});
		}
		window.view.showMix(new_data);
	}
	addItem() {
		console.log('click');
		let new_course = document.querySelector('.new_course').value;
		let new_date = document.querySelector('.new_date').value;
		let new_mark = document.querySelector('.new_mark').value;
		let mark = {course:new_course, mark:new_mark,};
		let time = {course:new_course, date:new_date,};
		window.marksModel.addMark(mark);
		window.timetableModel.addTimetable(time);
	}
}
document.addEventListener("DOMContentLoaded", function () {
	window.marksModel = new MarksModel();
	window.timetableModel = new TimetableModel();
	window.view = new View();
	window.controller = new Controller();
	window.controller.defaultAction();
	let tabs = document.querySelectorAll(".nav li");
	tabs[0].addEventListener("click", window.controller.showMarksList);
	tabs[1].addEventListener("click", window.controller.showTimetable);
	tabs[2].addEventListener("click", window.controller.mixed);
});

// let marks = new MarksModel();
// let timetable = new TimetableModel();
