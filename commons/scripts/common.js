/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an 
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
function parseISO8601(dateStringInRange) {
	var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
	date = new Date(NaN), month,
	parts = isoExp.exec(dateStringInRange);

	if(parts) {
		month = +parts[2];
		date.setFullYear(parts[1], month - 1, parts[3]);
		if(month != date.getMonth() + 1) {
			date.setTime(NaN);
		}
	}
	return date;
}


$(document).ready(function(){
	var win_h = $(window).height()-165;
	$("#wrap").height(win_h);

	$(".select_all").click(function(){
		var chk = $(this).is(":checked");
		if (chk) $(".select").prop('checked',true);
		else $(".select").prop('checked',false);
	});
	var board_tr = $(".list_board tr");
	var board_tr_color = $(".list_board .tr_color");
	board_tr.bind('mouseenter focus', function(){$(this).css('background-color','#eee');});
	board_tr.bind('mouseleave blur', function(){$(this).css('background-color','#fff');});
	board_tr_color.bind('mouseenter focus', function(){$(this).css('background-color','#eee');});
	board_tr_color.bind('mouseleave blur', function(){$(this).css('background-color','#f6f6f6');});
});