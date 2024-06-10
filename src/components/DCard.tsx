import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useScreenRenderer } from "~/hooks/useScreenRenderer";

interface DCardProps {
  id: string;
  contextId?: string;
}

export const DCard = ({ id, contextId }: DCardProps) => {
  const { data: states, updateState } = useScreenRenderer(contextId);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(states[id]?.data);
  }, [states]);

  useEffect(() => {
    console.log("rendering ", data?.title);
  });

  const handleUpdateCounter = () => {
    updateState &&
      data &&
      updateState(id, {
        ...data,
        counter: data?.counter + 1,
      });
  };

  return (
    <Box sx={{ minWidth: 275 }} textAlign={"left"} margin={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data?.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data?.counter}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleUpdateCounter}>
            Update Counter
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
