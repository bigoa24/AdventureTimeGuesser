export type Character = {
  id: string;
  name: string;
  aliases?: string[];
  image: string;
};

// Add new cartoon characters here one by one
export const CHARACTERS: Character[] = [
  // Adventure Time Characters
  { id: "finn", name: "Finn", aliases: ["Finn the Human", "Finn Mertens"], image: "/images/finn.png" },
  { id: "jake", name: "Jake", aliases: ["Jake the Dog"], image: "/images/jake.jpeg" },
  { id: "lemongrab", name: "Lemongrab", aliases: ["Earl of Lemongrab", "Lemon"], image: "/images/lemongrab.png" },
  
  // Gumball Characters
  { id: "tobias", name: "Tobias", aliases: ["Tobias Wilson"], image: "/images/tobias.jpg" },
  
  // Regular Show Characters
  { id: "skips", name: "Skips", aliases: ["Walks", "Immortal Yeti"], image: "/images/skips.jpg" },
  { id: "pops", name: "Pops", aliases: ["Pops Maellard", "Lollipop Man"], image: "/images/pops.jpeg" },
  
  // 🩸 KORKUNÇ KARAKTERLER (6. rounddan sonra) 💀
  { id: "gumball-cursed", name: "Gumball", aliases: ["Gumball Watterson", "Cursed Gumball", "Dark Gumball"], image: "/images/gumball.jpg" },
  { id: "benson-cursed", name: "Benson", aliases: ["Benson Dunwoody", "Cursed Benson", "Dark Benson"], image: "/images/benson.jpeg" },
  { id: "mordecai-cursed", name: "Mordecai", aliases: ["Mordecai Regular Show", "Cursed Mordecai", "Dark Mordecai"], image: "/images/mordecai.jpg" },
  { id: "spongebob-cursed", name: "SpongeBob", aliases: ["Sünger Bob", "SpongeBob SquarePants", "Cursed SpongeBob", "Dark SpongeBob"], image: "/images/spongebob.jpeg" },
];
