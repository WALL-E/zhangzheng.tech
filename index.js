/**
 * @author monkindey
 * @date 2015.11.5
 *
 * 1. 字母一个个出现，一个单词同一种颜色
 * 2. 支持多行书写(现在还不支持)
 * 3. promise思想
 */

'use strict';

! function() {
	var aboutMe = document.getElementById('about-me');
	// var color = ['#0e96a2', '#67a61c', '#fff', '#fff', '#fff'];
	var color = ['#fff', '#fff', '#fff'];
	var charactor = '';

	function getCharColor(charactor) {
		var index = parseInt(Math.random() * color.length) - 1;
		return '<span style="color:' + color[index] + '">' + charactor + '</span>';
	}

	// 简单的promise
	var Promise = function() {
		this.thens = [];
	}

	Promise.prototype.then = function(next) {
		this.thens.push(next);
		return this;
	};

	Promise.prototype.resolve = function() {
		var next = this.thens.shift();

		if (next) {
			var defer = next.call(null, arguments);
			defer instanceof Promise && (defer.thens = this.thens);
		}
	};

	// 函数科里化
	var step = function(opts) {
		opts = opts || {};
		var cmd = opts.cmd || '';
		var cwd = opts.cwd || '';
		var cb = opts.cb;
		var chars = cmd.split('');

		if (cwd) {
			chars.unshift(cwd);
		}

		return function() {
			var defer = new Promise();
			var containEl = document.createElement(opts.containEl || 'p');
			containEl.className = opts.cls || 'line';
			aboutMe.appendChild(containEl);

			// requestAnimationFrame
			setTimeout(function type() {
				if (chars.length !== 0) {
					charactor = chars.shift();
					// aboutMe.innerHTML += getCharColor(charactor);
					containEl.innerHTML += charactor;
					setTimeout(type, 100);
				} else {
					cb && cb();
					defer.resolve();
				}
			}, 100)
			return defer;
		}
	};

	var step1 = step({
		cwd: '[root@RestHub-DEV ~]#',
		cmd: ' whois',
		cls: ''
	});

	var step2 = step({
		cmd: 'i am a full stack developer, like c, python and js.',
		cls: 'result line'
	});

	var step3 = step({
		cmd: 'my name is zhangzheng, i live in Beijing now.',
		cls: 'result line'
	});

	var step4 = step({
		cwd: '[root@RestHub-DEV ~]#',
		cmd: ' cd resthub-core'
	});

	var step5 = step({
		cwd: '[root@RestHub-DEV ~]#',
		cmd: ' ls'
	});

	var step6 = step({
		cmd: 'resthub-core resthub-manager',
		cls: 'result line'
	});

	var step7 = step({
		cwd: '[root@RestHub-DEV ~]#',
		cmd: 'cd resthub-core',
	});

	var step8 = step({
		cwd: '[root@RestHub-DEV resthub-core]#',
		cmd: 'ls',
	});

	var step9 = step({
		cmd: 'core_modules  depend.sh  README.md  resthub-core-install.sh',
		cls: 'result line'
	});

	var step10 = step({
		cwd: '[root@RestHub-DEV resthub-core]#',
		cmd: 'open github'
	});

	var step11 = step({
		cmd: 'opening......',
		cb: function() {
			window.location.href = 'https://github.com/WALL-E/'
		}
	});

	step1().then(step2).then(step3)
		.then(step4).then(step5).then(step6)
		.then(step7).then(step8).then(step9)
		.then(step10).then(step11);
}()
