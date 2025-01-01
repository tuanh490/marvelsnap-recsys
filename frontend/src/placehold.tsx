import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();

  const [value, setValue] = useState("");

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const cards = { cards: ["IronMan"] };
      const res = await axios.post("http://localhost:3000/predict", cards);

      return res.data.recommendations;
    },
  });

  const { mutateAsync: predict } = useMutation({
    mutationFn: async (cards: { cards: string[] }) => {
      const res = await axios.post("http://localhost:3000/predict", cards);
      return res.data.recommendations;
    },
    onSuccess: (recommendations) => {
      queryClient.setQueryData(["cards"], recommendations);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <div className="">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={async () => {
            await predict({ cards: [value] });
            setValue("");
          }}
        >
          Predict
        </button>
      </div>
      {recommendations.map((card: string) => (
        <div key={card}>{card}</div>
      ))}
    </div>
  );
}
