class Video
{
    constructor(video) {
        let item = video.item_data;

        this.playUrl       = 'http://www.nicovideo.jp/watch/' + item.video_id;
        this.thumbnail      = item.thumbnail_url;
        this.title          = item.title;
        this.id             = item.description;
        this.uploadTime     = item.first_retrieve;
        this.playCount      = item.view_counter;
        this.commentCount   = item.num_res;
        this.subscribeCount = item.mylist_counter;

        this.favoriteTime   = video.create_time;
    }
}