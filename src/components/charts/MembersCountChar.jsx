import { ResponsiveLine } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MembersCountChart = (/* see data tab */) => {
  const data = [
    {
      id: "japan",
      color: "hsl(327, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 280,
        },
        {
          x: "helicopter",
          y: 244,
        },
        {
          x: "boat",
          y: 196,
        },
        {
          x: "train",
          y: 30,
        },
        {
          x: "subway",
          y: 68,
        },
        {
          x: "bus",
          y: 299,
        },
        {
          x: "car",
          y: 241,
        },
        {
          x: "moto",
          y: 40,
        },
        {
          x: "bicycle",
          y: 153,
        },
        {
          x: "horse",
          y: 76,
        },
        {
          x: "skateboard",
          y: 298,
        },
        {
          x: "others",
          y: 37,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 5, bottom: 0, left: 5 }}
      xScale={{ type: "point" }}
      colors="hsl(999, 0%, 86%)"
      //   yScale={{
      //     type: "cardinal",
      //     min: "auto",
      //     max: "auto",
      //     stacked: false,
      //     reverse: false,
      //   }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
    />
  );
};

export default MembersCountChart;
