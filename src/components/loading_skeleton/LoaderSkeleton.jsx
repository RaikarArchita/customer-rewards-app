import { Box, Skeleton, Stack } from "@mui/material";

const LoaderSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "12%",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Skeleton variant="circular" width={48} height={48} animation="wave" />
        <Stack
          direction="column"
          sx={{
            alignItems: "flex-start",
          }}
        >
          <Skeleton animation="wave" width={300} />
          <Skeleton animation="wave" width={180} />
          <Skeleton animation="wave" width={100} />
        </Stack>
      </Stack>

      {[100, 120, 70].map((labelW, i) => (
        <Stack
          key={i}
          direction="row"
          sx={{
            py: 2,
            borderTop: i === 0 ? "0.5px solid #efefef" : "none",
            borderBottom: "0.5px solid #efefef",
            alignItems: "center",
            justifyContent: "space-between",
            width:'350px'
          }}
        >
          <Stack direction="row" spacing={1}>
            <Skeleton
              variant="rounded"
              width={18}
              height={18}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={labelW}
              height={12}
              animation="wave"
            />
          </Stack>
          <Skeleton
            variant="rounded"
            width={30 + i * 10}
            height={14}
            animation="wave"
          />
        </Stack>
      ))}
    </Box>
  );
};

export default LoaderSkeleton;
