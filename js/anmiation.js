//通过动画显示数字

function showNumberAnimate(i,j,randNumber)
{
	var numberCell=$(`#number-cell-${i}-${j}`);
	numberCell.css('backgroundColor', getNumberBgColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:'100px',
		height:'100px',
		top:getPosTop(i,j),
		left:getPosLeft(i,j)


	},500);
}
//通过动画移动

function showMoveAnimate(fromx,fromy,tox,toy)
{
	var numberCell=$(`#number-cell-${fromx}-${fromy}`);
	 numberCell.animate({
		top: getPosTop(tox,toy),
		left: getPosLeft(tox,toy)
	},200);

}

