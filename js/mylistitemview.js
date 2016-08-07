class MyListItemView
{
    constructor() {
        // do nothing.
    }

    static show(videos) {
        videos = videos.reverse();
        Promise.resolve()
            .then(MyListItemView.getTemplate)
            .then(function(template) {
                $.each(videos, function(index, video) {
                    let dom = MyListItemView.toDom(video, template);
                    $('#mylistitem').append(dom);
                });
            });
    }

    static clear() {
        $('#mylistitem').children().remove();
    }

    static toDom(video, template) {
        let vid = new Video(video);
        let dom = template.clone();

        dom.find('.playurl').attr('href', vid.playUrl);

        console.log(vid.id);
        // console.log(typeof(vid.id));
        if (vid.id >= 24000000) {
            console.log('M');
            dom.find('.thumbnail').css('background-image', `url(" ${vid.thumbnail}.M ")`);
        } else if (vid.id >= 17000000) {
            dom.find('.thumbnail').css('background-image', `url(" ${vid.thumbnail}.L ")`);
        } else {
            dom.find('.thumbnail').css('background-image', `url(" ${vid.thumbnail} ")`);
        }
        
        dom.find('.title .playurl').text(vid.title);
        dom.find('.id').text(video.id);
        dom.find('.upload_time').text(Time.jpStr(vid.uploadTime));
        dom.find('.play_count .value').text(Number(vid.playCount).toLocaleString());
        dom.find('.comment_count .value').text(Number(vid.commentCount).toLocaleString());
        dom.find('.subscribe_count .value').text(Number(vid.subscribeCount).toLocaleString());

        return dom;
    }

    static getTemplate() {
        return new Promise(function(resolve, reject) {
            let dom = $('<div class ="video"/>');
            dom.load(chrome.extension.getURL("/html/video.html"), function() {
                resolve(dom);
            });
        });
    }

    static message(type) {
        var message = {
            PLEASE_LOGIN: 'ニコニコ動画にログインしていません．ログインしてから再度試してください．',
            NO_ITEM     : '登録されている動画がありません．'
        };
        $('#mylistitem').html('<span>' + message[type] + '<span>');
    }
}