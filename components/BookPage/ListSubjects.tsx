"use client"

import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { useState } from "react";

const ListSubjects = ({ books_subjects }: { books_subjects: { subjects: { label: string } }[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedSubjects = showAll ? books_subjects : books_subjects.slice(0, 20);

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {displayedSubjects.length > 0 && displayedSubjects.map((subject: { subjects: { label: string } }, index: number) => (
        <Chip
          size='sm'
          as={Link}
          href={`/discover?subjects=${subject.subjects.label}`}
          variant='faded'
          key={`subject - ${subject.subjects.label} - ${index}`}
        >
          {subject.subjects.label}
        </Chip>
      ))}
      {books_subjects.length > 20 && !showAll && (
        <span onClick={() => setShowAll(true)} className="text-sm font-semibold text-gray-600 mt-[2px] cursor-pointer">
          Show More ...
        </span>
      )}
    </div>
  );
};

export default ListSubjects;