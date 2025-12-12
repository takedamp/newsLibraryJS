/* UTF-8エンコーディング */

var irpocket = {
	code: '5621',
	base: '//xml.irpocket.com/',
	library: {
		category: {
			1: '決算短信',
			2: '決算説明資料',
			3: '有価証券報告書',
			4: '内部統制報告書',
			5: '株主総会',
			6: '株主総会（日時場所）',
			7: '株主総会（動画配信）'
		},
		categoryView: {
			1: '決算短信',
			2: '決算説明資料',
			3: '有価証券報告書',
			4: '内部統制報告書',
			5: '株主総会',
			6: '株主総会（日時場所）',
			7: '株主総会（動画配信）'
		},
		categoryDescription: {
		},
		moreText: '一覧',
		link: 'report?.html',
		dateFormat: 'YYYY年MM月DD日',
		dateFormat2: 'YYYY.MM.DD',
		dateFormat6: 'M月D日',
		quarterBuilder: function(y, q) {
			var wa = function(ce) { return '平成'+(ce-1988); };
                        if (q == 4) {
			    return  '通期';
                        }
                        else {
			    return  '第'+q+'四半期';
                        }
		},
		termBuilder: function(y, m, d) {
			var wa = function(ce) { return (ce-2005); };
			return y+'年'+ m +'月期';
		},
		termBuilder2: function(y, m, d) {
			var wa = function(ce) { return (ce-2011); };
			// var wa2 = function(ce) { return (ce-1948); };
			/* if(y == "2021"){
				return '臨時株主総会資料';
			}else if(y < "2021"){
				return '第' +wa2(y)+'回 株主総会資料';
			}else{ */
				return '第' +wa(y)+'回 定時株主総会';
			/* } */

		},
		categoryTerm: {
			1: 3,
			2: 3,
			3: 3,
			4: 3,
			5: 3
		},
		anchorlink: '#y',
		year2: 2016,
		year3:  {
			1: 2012,
			2: 2012,
			3: 2012,
			4: 2012,
			5: 2012
		},
		yearTitleFormat: 'YYYY年3月期',
		yearNaviFormat: 'YYYY年3月期',
		termTitleFormat: 'YYYY年3月期',
		topLimiter: 5,
		dlbtnText: '一括ダウンロード',
		dataSizeFormat: 'MB',
		dlIcon: 'zip',
		dlTagFormat: '<span class="c-button__label">dd</span><span class="ir-button__icon -download"></span>',
		nodata: {
			noDataText: '現在、ご案内可能な情報はございません。',
			noDataText2: '現在公開している動画はございません'
		}
	},
	release: {
		category: {
		},
		dateFormat: 'YYYY年MM月DD日',
		dateFormat2: 'YYYY.MM.DD',
		link: '',
		yearNaviFormat: 'YYYY年',
		yearTitleFormat: 'YYYY年',

		yearTitleFormat2: 'YYYY年3月期',
		terminalMonth: 12,
		nodata: {
			noDataText: '<span>現在公示中の法定公告はありません。</span>'
		},
		document: '/ir/news/detail/',
		koukoku: {
			noDataText: '現在公示中の法定公告はありません。'
		}
	},
	calendar: {
		yearTitleFormat: '${YYYY}年',
		yearFormat: '${YYYY}年',
		termBuilder: function(y, m, d) {
			var wa = function(ce) { return '平成'+(ce-1987); };
			return (y)+'年';
		},
		yearNaviFormat: '${YYYY+1}年 3月期',
//		termBuilder: function(y, m, d) {
//			var wa = function(ce) { return '平成'+(ce-1987); };
//			return (y+1)+'年（'+wa(y)+'年）'+'3月期 ';
//		},
		dateFormat: 'MM月DD日',
		dateFormat2: 'YYYY年MM月DD日',
		/* dateFormat: 'MM月DD日 HH:TT', */
		terminalMonth: 12,
		year: 2021,
		message: {
			noDataText: '現在公示中の予定はありません。'
		}
	},
	highlight: {
		cacheData: true,
		termFormat: 'YY/M月期'
	},
	dateFormat: 'YYYY年MM月DD日',
	message: {
		loading: '',
		quarter: [ ' 第1四半期', ' 第2四半期', ' 第3四半期', ' 通期' ]
	},
	rule: {
		/* IRトップ */
 		'irp-press-top': [ 'release-all-latest-5', 'releaseTop' ], 
		'irp-library-latestop-zip': [ 'ir-zip-jazip-all', 'latestLibraryZip' ],
		'irp-library-term-list': [ 'ir-latest-all', 'latestLibrary' ],
		'irp-cal-latest': [ 'calendar-jacal-latest-1', 'calendarTop'  ],

		/*ニュース*/
		'irp-press-list': [ 'release-all-all', 'release'  ],


		/*ライブラリ*/
		'irp-library-quarter-category': [ 'ir-all-all', 'libraryQuarterCategory' ],
		'irp-library-quarter-category5': [ 'ir-meeting-all', 'libraryQuarterCategory5' ],
		'irp-library-category6': [ 'ir-meeting-all', 'libraryCategory6'],
		'irp-library-category7': [ 'ir-meeting-all', 'libraryCategory7'],
		

		/*カレンダー*/
		'irp-calendar-list': [ 'calendar-jacal-all', 'calendar'  ],

		/* ガバナンス */
		'irp-gov': [ 'release-gov-latest-1', 'releaseGov'  ],


		// ↓本文機能
		'irp-detail-content': ['release-all-all','releaseContentId' ],
		'irp-news-content': ['release-all-all','releaseContentId' ],
		'irp-content': ['release-all-all','releaseContentId' ],
		'irp-csrnews-content': ['release-all-all','releaseContentId' ],
		// ↑本文機能
	}
};
