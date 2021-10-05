const flex2 = {
  type: "template",
  altText: "this is a carousel template",
  template: {
    type: "carousel",
    columns: [
      {
        thumbnailImageUrl:
          "https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZW5naW5lZXJpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        imageBackgroundColor: "#FFFFFF",
        title: "this is menu",
        text: "description",
        defaultAction: {
          type: "uri",
          label: "View detail",
          uri: "http://example.com/page/123",
        },
        actions: [
          {
            type: "postback",
            label: "Accept",
            data: "action=buy&itemid=111",
          },
          {
            type: "postback",
            label: "Reject",
            data: "action=add&itemid=111",
          },
          {
            type: "uri",
            label: "View detail",
            uri: "http://example.com/page/111",
          },
        ],
      },
    ],
    imageAspectRatio: "rectangle",
    imageSize: "cover",
  },
};
export default flex2;
