import { render,screen } from "@testing-library/react";
import List from "../List";

import { type Review } from "../Sandbox";
import Sandbox from "../Sandbox";

const mockReviews: Review[] = [
    {
      email: 'test@example.com',
      rating: '4',
      text: 'Great product!',
    },
    {
      email: 'user@example.com',
      rating: '5',
      text: 'Excellent service',
    },
  ];
describe("List comp unit test",()=>{
    test("renders heading",()=>{
        render(<List reviews={[]}/>)
        expect(screen.getByRole('heading',{level:2,name:/reviews/i})).toBeInTheDocument();
    })
    test("displays 'no review yet' when array is empty",()=>{
        render(<List reviews={[]}/>)
        expect(screen.getByText('No reviews yet')).toBeInTheDocument();
    })
    test("displays reviews correctly when provided",()=>{
        render(<List reviews={mockReviews}/>)
        mockReviews.map((review)=>{
            expect(screen.getByText(review.text)).toBeInTheDocument()
            expect(screen.getByText(review.email)).toBeInTheDocument()
            const stars = '⭐'.repeat(Number(review.rating))
            expect(screen.getByText(stars)).toBeInTheDocument()

        })
    })
})