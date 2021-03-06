const carousel1 = {
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    spacing: "md",
    contents: [
      {
        type: "button",
        style: "primary",
        action: {
          type: "uri",
          label: "Primary style button",
          uri: "https://example.com",
        },
      },
      {
        type: "button",
        style: "secondary",
        action: {
          type: "uri",
          label: "Secondary style button",
          uri: "https://example.com",
        },
      },
      {
        type: "button",
        style: "link",
        action: {
          type: "uri",
          label: "Link style button",
          uri: "https://example.com",
        },
      },
    ],
  },
};

export default carousel1;
