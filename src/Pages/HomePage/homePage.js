import React from "react";
import { HomePageCollection } from "./components/homePageCollection.js";

export function HomePage() {
  return (
    <>
      <HomePageBody />
    </>
  );
}

export function HomePageBody() {
  return (
    <div className="space-y-5">
      <HomePageCollection type="Chuột" />
      <HomePageCollection type="Bàn phím" />
      <HomePageCollection type="Màn hình" />
      <HomePageCollection type="Tai nghe" />
    </div>
  );
}
