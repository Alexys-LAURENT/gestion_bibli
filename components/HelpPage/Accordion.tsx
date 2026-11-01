"use client";

import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';

interface Question {
  question: string;
  answer: string;
}

const questions: Question[] = [
    {
      question: "How do I rent a book on this website?",
      answer: "To rent a book, browse our catalog, select the book you’d like to rent, and click the 'Rent' button. You’ll be prompted to choose the rental period and complete the checkout process."
    },
    {
      question: "What is the maximum rental period for a book?",
      answer: "The maximum rental period depends on the book. Most books can be rented for 7, 14, or 30 days. The available options will be shown when you select a book."
    },
    {
      question: "Can I extend my book rental? If so, how?",
      answer: "Yes, you can extend your rental if the book is not reserved by another user. Go to your rental history, select the book, and choose the 'Extend Rental' option."
    },
    {
      question: "What happens if I return the book late?",
      answer: "If you return a book late, a late fee may apply. The fee will be calculated based on the number of days the book is overdue."
    },
    {
      question: "How do I know when my rental period is ending?",
      answer: "We will send you reminder emails before your rental period ends. You can also check the remaining time in your account under the 'My Rentals' section."
    },
    {
      question: "How do I return a rented book?",
      answer: "To return a rented book, simply log into your account and follow the 'Return Book' process, or return it to the designated return section if it’s a physical book."
    },
    {
      question: "Are there any fees for late returns?",
      answer: "Yes, late returns may incur fees. The fee structure will depend on how many days the book is overdue, which will be detailed in our rental policy."
    },
    {
      question: "Can I cancel my book rental?",
      answer: "You can cancel a book rental before it has been shipped or downloaded. After the rental period starts, cancellations are not possible."
    },
    {
      question: "What condition should the book be in when I return it?",
      answer: "The book should be returned in the same condition as when it was rented. Any damage may result in fees or replacement costs."
    },
    {
      question: "How do I report a lost or damaged book?",
      answer: "If a book is lost or damaged, please contact our customer support immediately. We’ll guide you through the next steps, which may include a fee for replacement."
    },
    {
      question: "What payment methods are accepted for renting books?",
      answer: "We accept credit/debit cards, PayPal, and other major payment options as displayed during checkout."
    },
    {
      question: "Do you offer discounts for frequent renters?",
      answer: "Yes! We offer discounts and loyalty points for frequent renters. Check out our membership plans for more details."
    },
    {
      question: "How do I view my rental history?",
      answer: "You can view your rental history by logging into your account and visiting the 'My Rentals' section, where all past and current rentals are displayed."
    },
    {
      question: "Can I reserve a book that is currently unavailable?",
      answer: "Yes, you can reserve books that are currently unavailable. We’ll notify you once the book becomes available for rent."
    },
    {
      question: "What should I do if the book I rented is missing pages or damaged?",
      answer: "If you receive a book with missing pages or damage, contact our support team immediately for assistance. We’ll arrange for a replacement if necessary."
    }
  ];
  
const AccordionQuest = () => {
  return (
    <Accordion itemClasses={{trigger:'data-[open=true]:text-gest_cta'}}>
      {questions.map((item, index) => (
        <AccordionItem key={index} title={item.question}>
          {item.answer}
        </AccordionItem>
      ))}
    </Accordion>  
  );
};

export default AccordionQuest;
