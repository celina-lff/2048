var nums=new Array();
$(function(){
newGame();
});

function newGame()
{
init();

createNumber();
createNumber();

}
function init()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
		var gridCell=$("#grid-cell-"+i+"-"+j);
		gridCell.css('top',getPosTop(i,j));
		gridCell.css('left',getPosLeft(i,j));

		}
	}
		for(var i=0;i<4;i++)
		{
		 nums[i]=new Array();
		
		for(var j=0;j<4;j++)
		{
			nums[i][j]=0;
		}
}

updateView();

}

function updateView()
{
	$('.number-cell').remove();
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append(`<div id="number-cell-${i}-${j}" class="number-cell"></div>`);
			var numberCell=$(`#number-cell-${i}-${j}`);

			if(nums[i][j]!=0)
			{
			numberCell.css('width','100px');
			numberCell.css('height','100px');
			numberCell.css('top',getPosTop(i,j));
			numberCell.css('left',getPosLeft(i,j));
			numberCell.css('backgroundColor', getNumberBgColor(nums[i][j]));
			numberCell.css('color', getNumberColor(nums[i][j]));
			numberCell.text(nums[i][j]);

			}
			else 
			{
			numberCell.css('width','0px');
			numberCell.css('height','0px');
			numberCell.css('top',getPosTop(i,j)+50);
			numberCell.css('left',getPosLeft(i,j)+50);
			}
		}
	}
}



/**
 * 产生随机数(2或4)
 * 找到随机位置(空单元格)
 */

 function createNumber()
 {
 	//判断是否还有空间，如果没有空位置则游戏结果
 	if(noSpace(nums))
 	{
 		return;
 	}

//找到随机位置
var count=0;
var arr=new Array();
for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(nums[i][j]==0)
			{
				arr[count]=i*4+j;
				count++;
			}
		}
	}
var n=Math.floor(Math.random()*count);
var randX=Math.floor(arr[n]/4);
var randY=Math.floor(arr[n]%4);


 //随机产生2或4
var randNumber=Math.random()>0.5?2:4;
nums[randX][randY]=randNumber;

	//在随机的位置上显示随机数字
	showNumberAnimate(randX,randY,randNumber);
 }

//实现键盘响应
$(document).keydown(function(event) {
	//console.log(event.keyCode);
	event.preventDefault();
	switch (event.keyCode) {
		case 37:
			//left

			if(canMoveLeft(nums))
			{
				//判断是否可以向左移动

				moveLeft();
				setTimeout(createNumber,200);

			}
			break;
		case 38://up
		if(canMoveUp(nums))
		{
			moveUp();
			setTimeout(createNumber,200);
		}
			break;
		case 39://right
			if(canMoveRight(nums))
		{
			moveRight();
			setTimeout(createNumber,200);

		}
		break;	
		case 40://down
			if(canMoveDown(nums))
			{
			moveDown();
			setTimeout(createNumber,200);

			}
		break;

	}
});



/*function isgameover()
{
	if(noSpace(nums)&&nomove(nums))
	{
		gameover();
	}
}
function gameover(){
    alert("gameover");
}*/



function moveLeft()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(nums[i][j]!=0)
			{
			for(var k=0;k<j;k++)
			{
				//从最左边开始遍历左边所有的单元格，进行判断
			if(nums[i][k]==0&&noBlockHorizal(i,k,j,nums))
				//第i行的第k-j列之间是否有障碍物
			{
				//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[i][k]=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;//将原来的为止设置为0
				break;
			}
			else if(nums[i][k]==nums[i][j] && noBlockHorizal(i,k,j,nums))
			{
					//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[i][k]+=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;
				break;
				}
			}	

			}
		}
	}
	setTimeout(updateView,200);
}


function moveRight()
{
	for(var i=0;i<4;i++)
	{
		for(var j=2;j>=0;j--)
		{
			if(nums[i][j]!=0)
			{
			for(var k=3;k>=0;k--)
			{
				//从最右边开始遍历左边所有的单元格，进行判断
			if(nums[i][k]==0&&noBlockHorizal(i,k,j,nums))
				//第i行的第k-j列之间是否有障碍物
			{
				//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[i][k]=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;//将原来的为止设置为0
				break;
			}
			else if(nums[i][k]==nums[i][j] && noBlockHorizal(i,k,j,nums))
			{
					//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[i][k]+=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;
				break;
				}
			}	

			}
		}
	}
	setTimeout(updateView,200);
}


function moveUp()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(nums[i][j]!=0)
			{
			for(var k=0;k<i;k++)
			{
				//从最上边开始遍历左边所有的单元格，进行判断
				if(nums[k][j]==0&&noBlockHorizal(k,j,j,nums))
					//第i行的第k-j列之间是否有障碍物
				{
					//移动操作
					showMoveAnimate(i,j,k,j);//显示移动的动画效果
					nums[k][j]=nums[i][j];//从i,j移动到i,k
					nums[i][j]=0;//将原来的为止设置为0
					break;
				}
			else if(nums[k][j]==nums[i][j] && noBlockHorizal(k,j,j,nums))
			{
					//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[k][j]+=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;
				break;
				}
			}	

			}
		}
	}
	setTimeout(updateView,200);
}


function moveDown()
{
	for(var i=2;i>=0;i--)
	{
		for(var j=0;j<4;j++)
		{
			if(nums[i][j]!=0)
			{
			for(var k=3;k>=0;k--)
			{
			//从最下边开始遍历左边所有的单元格，进行判断
			if(nums[k][j]==0&&noBlockHorizal(k,j,j,nums))
				//第i行的第k-j列之间是否有障碍物
			{
				//移动操作
				showMoveAnimate(i,j,k,j);//显示移动的动画效果
				nums[k][j]=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;//将原来的为止设置为0
				break;
			}
			else if(nums[k][j]==nums[i][j] && noBlockHorizal(k,j,j,nums))
			{
					//移动操作
				showMoveAnimate(i,j,i,k);//显示移动的动画效果
				nums[k][j]+=nums[i][j];//从i,j移动到i,k
				nums[i][j]=0;
				break;
				}
			}	

			}
		}
	}
	setTimeout(updateView,200);
}


