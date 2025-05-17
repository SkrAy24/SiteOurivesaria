import React from "react";
import { Testimonial } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <CardContent className="p-0">
        <div className="text-gold mb-4 flex">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="fill-gold text-gold" size={18} />
          ))}
        </div>
        <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-darkGray font-semibold">
              {testimonial.initials}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-darkGray">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">
              Cliente desde {testimonial.customerSince}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
