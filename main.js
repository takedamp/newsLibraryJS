/*
 * main.js: IR Pocket contents loader script
 * $Rev: 1885 $
 */

(function() {
	irpocket.init();
	
	var builderFuncs = {
	latestLibrary: function(u, t) { return [ u, function(d) {
		var qt = document.getElementById('irp-library-quarter-list');
		irpocket.handlerLibraryTop(qt, t, d);
		irpocket.setHTML(document.getElementById('irp-library-term-quarter-name'), irpocket._termQuarterName);
		irpocket.setHTML(document.getElementById('irp-library-term-name'), irpocket._termName);
	} ]; },
	latestLibraryZip: function(u, t) { return [ u, function(d) {
		if(1 <= d.item.length) {
			t.href = d.item[0].link;			// set
		} else {
			t.parentNode.removeChild(t);	// remove parent node of A element
		}
	} ]; },

	libraryCategoryTop: function(u, t) { return [ u, function(d) {
		d1 = d;
		irpocket.handlerLibraryTop(t, d);
		irpocket.setHTML(document.getElementById('irp-library-category-title'), irpocket._categoryName);
	} ]; },
	/* 決算情報 */
	libraryQuarterCategory: function(u, t) { return [ u, function(d) {
		//irpocket.handlerQuarterLibrary(t, d);
		irpocket.handlerQuarterLibrary(t, d);
		irpocket.setHTML(document.getElementById('irp-library-quarter-category-title'), irpocket._categoryName);
	} ]; },
	/* 総会 */
	libraryQuarterCategory5: function(u, t) { return [ u, function(d) {
		//irpocket.handlerQuarterLibrary(t, d);
		irpocket.handlerQuarterLibrary5(t, d);
		irpocket.setHTML(document.getElementById('irp-library-quarter-category-title'), irpocket._categoryName);
	} ]; },
	libraryCategory6: function(u, t) { return [ u, function(d) {
		irpocket.handlerLibrary6(t, d);
		irpocket.setHTML(document.getElementById('irp-library-category-title'), irpocket._categoryName);
	} ]; },
	libraryCategory7: function(u, t) { return [ u, function(d) {
		irpocket.handlerLibrary7(t, d);
		irpocket.setHTML(document.getElementById('irp-library-category-title'), irpocket._categoryName);
	} ]; },

	calendar: function(u, t) { return [ u, function(d) {
		irpocket.handlerCalendar(t, d);
	} ]; },
	calendarTop: function(u, t) { return [ u, function(d) {
		irpocket.handlerCalendarTop(t, d);
	} ]; },

	releaseContentId: function(u, t) {
		var y = (location.search.match(/year=([0-9]+)/));
		if(y) {
			var url = u.replace(/YYYY/, y[1]);
			return [ url, function(d) {
				irpocket.handlerContentId(t, d);
			} ];
		}
	},

	releaseNavi: function(u, t) { return [ u, function(d) {
		if(d && d.item && 0 < d.item.length) {
			// latest first
			var ymd = d.item[0].published.split(/-/);
			var year = ymd[0] - ((ymd[1] <= (irpocket.release.terminalMonth || 0)%12) ? 1 : 0);
			irpocket._latestYear = year;
		}
		irpocket.buildYearNavi(t);
	} ]; },



	releaseKoukoku: function(u, t) { return [ u, function(d) {
		irpocket.handlerReleaseKoukoku(t, d);
	} ]; },

	release: function(u, t) { return [ u, function(d) {
		if(d && d.item && 0 < d.item.length) {
			// latest first
			var ymd = d.item[0].published.split(/-/);
			var year = ymd[0] - ((ymd[1] <= (irpocket.terminalMonth || 0)%12) ? 1 : 0);
			irpocket._latestYear = year;
		}
		irpocket.handlerRelease(t, d);
	} ]; },


	releaseTop: function(u, t) { return [ u, function(d) {
		if(d && d.item && 0 < d.item.length) {
			// latest first
			var ymd = d.item[0].published.split(/-/);
			var year = ymd[0] - ((ymd[1] <= (irpocket.terminalMonth || 0)%12) ? 1 : 0);
			irpocket._latestYear = year;
		}
		irpocket.handlerReleaseTop(t, d);
	} ]; },



	/* ガバナンス */
	releaseGov: function(u, t) { return [ u, function(d) {
		if(d && d.item && 0 < d.item.length) {
			// latest first
			var ymd = d.item[0].published.split(/-/);
			var year = ymd[0] - ((ymd[1] <= (irpocket.terminalMonth || 0)%12) ? 1 : 0);
			irpocket._latestYear = year;
		}
		irpocket.handlerReleaseGov(t, d);
	} ]; }
	};
	
	
	var filterFuncs = {
	latestYear: function(d) {
		var latest_year;
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			var y = (input[i].published.split(/-/))[0];
			if(y == (latest_year = latest_year || y)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	latestTerm: function(d) {
		var end_month = irpocket.terminalMonth || 3;
		var latest_year;
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			var ymd = input[i].published.split(/-/);
			var y = ymd[0] - ((ymd[1] <= end_month%12) ? 1 : 0);
			if(y == (latest_year = latest_year || y)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	customFilter: function(d) {
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			if(input[i].category_name == '') {
				continue;
			}
			var t = input[i].title;
			t = t.replace(/^ /, '');
			if(t != input[i].title || t == "") {
				input[i].title = t;
				d.item.push(input[i]);
			}
		}
		return d;
	},
	latestTerm: function(d) {
		var end_month = irpocket.terminalMonth || 3;
		var latest_year;
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			var ymd = input[i].published.split(/-/);
			var y = ymd[0] - ((ymd[1] <= end_month%12) ? 1 : 0);
			if(y == (latest_year = latest_year || y)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	latestTerm: function(d) {
		var end_month = irpocket.terminalMonth || 3;
		var latest_year;
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			var ymd = input[i].published.split(/-/);
			var y = ymd[0] - ((ymd[1] <= end_month%12) ? 1 : 0);
			if(y == (latest_year = latest_year || y)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	onlyJapanese: function(d) {
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			if(irpocket.containsMultibyte(input[i].title)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	onlyEnglish: function(d) {
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			if(!irpocket.containsMultibyte(input[i].title)) {
				d.item.push(input[i]);
			}
		}
		return d;
	},
	inTerm: function(d) {
		var y = (location.search.match(/year=([0-9]+)/));
		var input = d.item;
		d.item = [ ];
		for(var i=0 ; i<input.length ; i++) {
			var ymd = input[i].published.split(/[^0-9]/);
			if(ymd[0]==y[1]*1 && ymd[1]*1==5 && ymd[2]*1 <= 20) {
				continue;
			}
			if(ymd[0]==y[1]*1+1 && ymd[1]*1==5 && 20 < ymd[2]*1) {
				continue;
			}
			d.item.push(input[i]);
		}
		return d;
	},
	customDomain: function(d) {
		var base = irpocket._basePDF || 'http://pdf.irpocket.com/';
		for(var i=0 ; i<d.item.length ; i++) {
			var link = d.item[i].link;
			if(link && link.indexOf(base) == 0) {
				d.item[i].link = irpocket.basePDF + link.substr(base.length)
			}
		}
		return d;
	}
	};
	
	// check every rule and push to queue
	for(var id in irpocket.rule) {
		var target = document.getElementById(id);
		if(target) {
			var url = irpocket.rule[id][0];
			url = url ? irpocket.base + irpocket.code + '/JS/' + url + '.js' : '';
			var rule = irpocket.rule[id][1];
			var ub = (builderFuncs[rule] || builderFuncs['release'])(url, target);
			url = ub[0];
			var builder = ub[1];
			var filters = [ builder ];
			for(var i=irpocket.rule[id].length-1 ; 2 <= i ; i--) {
				var fname = irpocket.rule[id][i];
				filters.push(filterFuncs[fname]);
			}
			irpocket.prepareNext(url, filters);
		}
	}
	
	var say = function(s, a) { a ? a.innerHTML += s : document.appendChild(s); }
	var legalDone = { };
	var putLegal = function(ls) {
		var noticeArea = document.getElementById('irp-legal');
		for(var t in ls) {
			if(!legalDone[t]) {
				say(ls[t], noticeArea);
				legalDone[t] = 1;
			}
		}
	};
	var callNext = function() {
		var next = irpocket._next.shift();
		if(next && next.build) {
			if(next.url) {
				window.ir20handler = function(data) {
					next.build(data);
					if(data.legal) {
					//	putLegal(data.legal);
					}
					callNext();
				};
				var dt = new Date();
				var s = document.createElement('script');
				s.src = `${next.url}?${dt.getTime()}`;
				s.type = 'text/javascript';
				document.appendChild(s);
			} else {
				next.build();
			}
		}
	};
	callNext();
})();