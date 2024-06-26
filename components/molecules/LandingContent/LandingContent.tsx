"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";

const testimonials = [
  {
    name: "Tony Stark",
    avatar: "TS",
    title: "CTO",
    description: "A really productive application for daily tasks",
  },
  {
    name: "Steve Rogers",
    avatar: "SR",
    title: "CEO",
    description: "Finally I don't have to rely on Tony ",
  },
  {
    name: "Bruce Wayne",
    avatar: "BW",
    title: "Generalist",
    description: "I used this to buy the bank.",
  },
  {
    name: "Peter Parker",
    avatar: "PP",
    title: "Intern",
    description: "I use this as an alternative for Mr. Stark's AI",
  },
];
export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 ">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials?.map((item, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
              <div className="p-2 text-[1.2rem] bg-[#f5f5f51e] rounded-full h-12 w-12 flex justify-center items-center"><div>{item?.avatar}</div></div>
                <div>
                  <p className="text-lg">{item?.name}</p>
                  <p className="text-zinc-400 text-sm">{item?.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item?.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
