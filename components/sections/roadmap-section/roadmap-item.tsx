import Text from "../../common/text";

const getRoadmapLine = (status: string, isLastItem: boolean) => {
  switch (status) {
    case "finished": {
      return () => (
        <>
          <div
            className="absolute"
            style={{
              border: "2px solid #39B54A",
              borderRadius: "50%",
              width: "17px",
              height: "17px",
              backgroundColor: "#1f2641",
              zIndex: 1,
              top: "4px",
            }}
          />
          <div
            className="absolute"
            style={{
              borderLeft: "2px solid #39B54A",
              height: "-webkit-fill-available",
              top: "17px",
              left: "7.5px",
              opacity: !isLastItem ? 1 : 0,
            }}
          />
        </>
      );
    }
    case "current": {
      return () => (
        <>
          <div
            className="absolute flex justify-center items-center"
            style={{
              border: "2px solid #39B54A",
              borderRadius: "50%",
              width: "17px",
              height: "17px",
              backgroundColor: "#1f2641",
              zIndex: 1,
              top: "4px",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "7px",
                height: "7px",
                backgroundColor: "#EFB91C",
              }}
            />
          </div>
          <div
            className="absolute"
            style={{
              borderLeft: "2px dashed #545C79",
              height: "-webkit-fill-available",
              top: "17px",
              left: "7.5px",
              opacity: !isLastItem ? 1 : 0,
            }}
          />
        </>
      );
    }
    default: {
      return () => (
        <>
          <div
            className="absolute"
            style={{
              border: "2px solid #545C79",
              borderRadius: "50%",
              width: "17px",
              height: "17px",
              backgroundColor: "#1f2641",
              zIndex: 1,
              top: "4px",
            }}
          />
          <div
            className="absolute"
            style={{
              borderLeft: "2px dashed #545C79",
              height: "-webkit-fill-available",
              top: "17px",
              left: "7.5px",
              opacity: !isLastItem ? 1 : 0,
            }}
          />
        </>
      );
    }
  }
};

const RoadmapItem = ({ data, isLastItem }) => {
  const RoadmapLine = getRoadmapLine(data.status, isLastItem);
  return (
    <div className="flex flex-row justify-center roadmap__item md:mb-0 mb-4">
      <Text
        className="hidden md:block"
        size="normal"
        weight="bold"
        style={{ minWidth: 100, maxWidth: 100 }}
      >
        {data.date}
      </Text>
      <div className="flex flex-row relative ml-8 text-left">
        <RoadmapLine />
        <div
          className="mr-4 ml-8 mt-3"
          style={{ backgroundColor: "#545C79", width: 60, height: 1 }}
        />
        <div className="flex flex-col md:block">
          <Text
            className="md:hidden md:mb-0 mb-4"
            size="normal"
            weight="bold"
            style={{ minWidth: 100, maxWidth: 100 }}
          >
            {data.date}
          </Text>
          <Text className="md:max-w-xl" type="p">
            {data.content}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RoadmapItem;
