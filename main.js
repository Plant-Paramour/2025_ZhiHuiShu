// ==UserScript==
// @name         智慧树(知到网页版)自动播放
// @match        *://*.zhihuishu.com/*
// @author       Plant-Paramour
// ==/UserScript==

(function () {
    'use strict';

    // 每 1 秒检查一次
    setInterval(function () {
        const v = document.querySelector('video');
        if (!v) return;

        // 静音
        var volume = $(".volumeBox.volumeNone")[0];
        if(volume == undefined){
            $(".volumeIcon").click();
        }
        // 默认1倍速（这里可以根据需求修改）
        v.playbackRate = 1;
        // 如果被暂停，自动播放
        if (v.paused) v.play();

        // 进度 ≥ 95.0% 就认为结束（这里可以根据需求修改）
        if (v.duration && v.currentTime / v.duration >= 0.95) {
            console.log('进度 ≥ 95.0% 就认为结束');
            const url = new URL(location.href);
            const fid = parseInt(url.searchParams.get('fileId'));
            if (!isNaN(fid)) {
                url.searchParams.set('fileId', fid + 1);
                location.href = url.href;
            } else {
                console.warn('未能获取有效 fileId，无法跳转');
            }
        }
    }, 1000);

})();



