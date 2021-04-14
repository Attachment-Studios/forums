
function getDataBackup() {
	let ls = localStorage.getItem('all');
	let pb = localStorage.getItem('forcePushBackUp');

	console.log('current storage log:\n' + ls);
	console.log('force-push backup log:\n' + pb);
}

function forceBackup() {
	let ls = localStorage.getItem('all');
	let pb = localStorage.getItem('forcePushBackUp');

	if ( pb === null ) {
		pb = ""
	}

	localStorage.setItem('forcePushBackUp', ls+JSON.stringify(pb));
}

function forcePush(push_data) {
	let ls = localStorage.getItem('all');
	let pb = localStorage.getItem('forcePushBackUp');

	if ( pb === null ) {
		pb = ""
	}

	localStorage.setItem('forcePushBackUp', ls+JSON.stringify(pb));

	localStorage.setItem('all', JSON.stringify(push_data));
}

function removeForumsAllContent_exe() {
	localStorage.setItem('all', '');
}

function changeContent(address) {
	document.getElementById('topics').innerHTML = `<iframe src="${address}/index.html" width="100%" height="100%"></iframe>`;
}

function create(topic_id, content_id) {
	let ls = localStorage.getItem('all');

	let firstForum = false;

	let array;

	if ( ls === null || ls === '' ) {
		firstForum = true;
	} else {
		array = ls.split(',');
	}

	let title = document.getElementById(topic_id).value;
	let content =  document.getElementById(content_id).value;
	let datetime = new Date();
	let author = 'Anonymous User';
	
	let transmit;
	if ( firstForum === false ) {
		array.push(title);
		array.push(content);
		array.push(datetime);
		array.push(author);
	} else {
		array = [ title, content, datetime, author ];
	}
	transmit = array;

	localStorage.setItem('all', transmit.join(','));
}

function display(my_id) {
	let ls = localStorage.getItem('all');

	let array;
	if ( ls !== null || ls !== "" ) {
		array = ls.split(',');
	} else {
		array = [];
	}

	let forum_count = 4;

	var u;
	var arrLen = [];
	for ( u in array ) {
		if ( Math.floor(u/4) === u/4 && array.length !== 0 && array !== null && array !== "" ) {
			arrLen.push('a');
		}
	}

	var i;
	document.getElementById(my_id).innerHTML = ``;
	for ( i in arrLen ) {
		let pre = document.getElementById(my_id).innerHTML;

		let card = `
			<div class="card">
				<div class="title">
					<h4>${array[((i)*forum_count)+0]}</h4>
				</div>
				<div class="info">
					<div class="author">
						<h6>Created by <a href="#" id="name">${array[((i)*forum_count)+3]}</a></h6>
					</div>
					<div class="date-time">
						<h6>${array[((i)*forum_count)+2]}</h6>
					</div>
				</div>
			</div>
		`;

		document.getElementById(my_id).innerHTML = pre + card;
	}
}
