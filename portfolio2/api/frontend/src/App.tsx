import { ofetch } from "ofetch";
import { useEffect } from "react";

function App() {
  // console.log("fetching data...");
  // const data = ofetch("http://localhost:3000/habits").then((res) => {
  //   console.log("data fetched", res);
  // });
  // console.log("done");

  // const data = ofetch("http://localhost:3000/habits", {
  //   onResponse({ request, response }) {
  //     console.log("[fetch response]", request, response.status, response.body);
  //   },
  // }).then((res) => {
  //   console.log("data fetched", res);
  // });

  // return <div>Check the console for fetch call logs.</div>;

  const initializeData = () => {
    console.log("fetching data");
    ofetch("http://localhost:3000/habits").then(
      (habits: { data: HabitType[] }) => {
        console.log("data fetched");
        setHabits(habits.data);
        setStreaks(
          habits.data.map((habit) => ({
            id: crypto.randomUUID(),
            habitId: habit.id,
            streakCount: 0,
          }))
        );
        console.log("data initialized");
      }
    );
  };

  useEffect(() => {
    initializeData();
  }, []);

  // Kortformen. Legg merke til at vi ikke kaller funksjonen
  // Sender kun pekeren til funksjonen slik at useEffect kan kalle den
  // useEffect(initializeData, []);
}

export default App;
