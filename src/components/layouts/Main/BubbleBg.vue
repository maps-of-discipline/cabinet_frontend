<template>
	<div class="sc-fremEr BubbleBg">
		<svg
			width="620"
			height="570"
			viewBox="0 0 620 570"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M333.676 1.93177C428.781 13.6788 480.842 107.607 535.05 186.629C582.329 255.551 636.893 330.791 614.509 411.318C592.853 489.225 508.9 525.549 433.05 553.571C368.009 577.6 301.213 573.07 235.35 551.397C151.615 523.841 56.0559 499.684 22.0945 418.336C-17.4711 323.565 -3.03744 209.993 58.4905 127.766C122.067 42.801 228.358 -11.0768 333.676 1.93177Z"
				fill="#fff"
			></path></svg
		><svg
			width="620"
			height="570"
			viewBox="0 0 620 570"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M333.676 1.93177C428.781 13.6788 480.842 107.607 535.05 186.629C582.329 255.551 636.893 330.791 614.509 411.318C592.853 489.225 508.9 525.549 433.05 553.571C368.009 577.6 301.213 573.07 235.35 551.397C151.615 523.841 56.0559 499.684 22.0945 418.336C-17.4711 323.565 -3.03744 209.993 58.4905 127.766C122.067 42.801 228.358 -11.0768 333.676 1.93177Z"
				fill="#fff"
			></path></svg
		><svg
			width="620"
			height="570"
			viewBox="0 0 620 570"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M333.676 1.93177C428.781 13.6788 480.842 107.607 535.05 186.629C582.329 255.551 636.893 330.791 614.509 411.318C592.853 489.225 508.9 525.549 433.05 553.571C368.009 577.6 301.213 573.07 235.35 551.397C151.615 523.841 56.0559 499.684 22.0945 418.336C-17.4711 323.565 -3.03744 209.993 58.4905 127.766C122.067 42.801 228.358 -11.0768 333.676 1.93177Z"
				fill="#66dfdf"
			></path></svg
		><svg
			width="620"
			height="570"
			viewBox="0 0 620 570"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M333.676 1.93177C428.781 13.6788 480.842 107.607 535.05 186.629C582.329 255.551 636.893 330.791 614.509 411.318C592.853 489.225 508.9 525.549 433.05 553.571C368.009 577.6 301.213 573.07 235.35 551.397C151.615 523.841 56.0559 499.684 22.0945 418.336C-17.4711 323.565 -3.03744 209.993 58.4905 127.766C122.067 42.801 228.358 -11.0768 333.676 1.93177Z"
				fill="#fff"
			></path>
		</svg>
		<div class="circle c2"></div>
		<div class="circle c3"></div>
		<div class="circle c4"></div>
		<div class="circle c5"></div>
	</div>
</template>

<script setup></script>

<style lang="scss">
@import '@styles/_variables.scss';

.BubbleBg {
	width: 100%;
	height: 200px;
	position: absolute;
	top: 0px;
	left: 0px;
	background: linear-gradient(119deg, rgb(64, 197, 197), rgb(46, 155, 155));
	z-index: -1;
	overflow: hidden;
}

.BubbleBg svg:nth-child(1) {
	transform: scale(4) rotate(287deg) translate(490px, 190px);
}

.BubbleBg svg:nth-child(2) {
	transform: scale(2) rotate(15deg) translate(622px, -410px);
}

.BubbleBg svg:nth-child(3) {
	transform: scale(3) rotate(30deg) translate(175.9px, 179px);
}

.BubbleBg svg:nth-child(4) {
	transform: scale(2) rotate(60deg) translate(175.9px, 159px);
}

.BubbleBg .circle {
	width: 100px;
	height: 100px;
	position: absolute;
	border-radius: 100%;
	z-index: 1;
	background: linear-gradient(283deg, rgb(102, 223, 223), rgb(46, 155, 155));
}

.BubbleBg .circle.c2 {
	transform: translate(914px, 110px) scale(1.4);
}

.BubbleBg .circle.c3 {
	transform: translate(303px, -70px) scale(3);
}

.BubbleBg .circle.c4 {
	transform: translate(453px, 3px) scale(1);
	z-index: -1;
}

.BubbleBg .circle.c5 {
	transform: translate(1336px, 10px) scale(0.8);
}

.BubbleBg svg {
	position: absolute;
	opacity: 0.05;
	z-index: 0;
}
</style>
