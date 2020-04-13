window.chrome = {
  runtime: {
    connect: () => {
      console.log("connected");
      return null;
    },
    onMessage: {
      addListener: (callback) => {
        callback(
          JSON.parse(`[
            {
                "id": "4551",
                "url": "https://www.test.com",
                "status": "complete",
                "method": "GET",
                "startTime": "1586722689533.8782",
                "endTime": "1586722689600.368"
            },
            {
                "id": "4552",
                "url": "https://www.test.com",
                "status": "complete",
                "method": "GET",
                "startTime": "1586722689929.187",
                "endTime": "1586722691177.23"
            },
            {
                "id": "4619",
                "url": "https://www.test.com/post",
                "status": "error",
                "method": "POST",
                "startTime": "1586722690820.473",
                "endTime": "1586722690927.346"
            },
            {
                "id": "4697",
                "url": "https://www.test.com/login",
                "status": "complete",
                "method": "POST",
                "startTime": "1586722690824.838",
                "endTime": "1586722690925.6511"
            },
            {
                "id": "4704",
                "url": "https://www.test.com/pending",
                "status": "pending",
                "method": "POST",
                "startTime": "1586722691379.0842",
                "endTime": "1586722691432.485"
            },
            {
                "id": "4706",
                "url": "https://www.test.com",
                "status": "complete",
                "method": "GET",
                "startTime": "1586722690824.838",
                "endTime": "1586722690925.6511"
            },
            {
                "id": "4709",
                "url": "https://www.test.com",
                "status": "error",
                "method": "GET",
                "startTime": "1586722691379.0842",
                "endTime": "1586722691432.485"
            },
            {
                "id": "4722",
                "url": "https://www.test.com",
                "status": "complete",
                "method": "POST",
                "startTime": "1586722689533.8782",
                "endTime": "1586722689600.368"
            },
            {
                "id": "4794",
                "url": "http://www.test.com",
                "status": "complete",
                "method": "GET",
                "startTime": "1586722689929.187",
                "endTime": "1586722691177.23"
            }
        ]`)
        );
      },
    },
  },
};
