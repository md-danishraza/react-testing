import { render,screen } from "@testing-library/react";
import List from "../List";
import Form from "../Form"
import userEvent from "@testing-library/user-event";
import { type Review } from "../Sandbox";

export const getFormElements = ()=>{
    const emailInput = screen.getByRole('textbox',{name:/email/i})
    const ratingSelect = screen.getByRole('combobox',{name:/rating/i})
    const textArea = screen.getByRole('textbox',{name:/your review/i})
    const submitBtn = screen.getByRole('button',{name:/submit/i})
    return {
        emailInput,
        ratingSelect,
        textArea,
        submitBtn
    }
}


describe("form comp unit test",()=>{
    const mockOnSubmit = vi.fn();
    // Before each test runs:
  beforeEach(() => {
    // Clear all information about how the mock was called
    // This ensures each test starts with a fresh mock function
    // without any previous calls recorded
    mockOnSubmit.mockClear();
  });
    test("render form elements correctly",()=>{
        render(<Form onSubmit={mockOnSubmit} />)

        const { emailInput, ratingSelect, textArea, submitBtn } =
      getFormElements();
    expect(emailInput).toHaveValue('');
    expect(ratingSelect).toHaveValue('');
    expect(textArea).toHaveValue('');
    expect(submitBtn).toBeInTheDocument();
    })

    test('shows error message when review is too short', async () => {
        const user = userEvent.setup();
        render(<Form onSubmit={mockOnSubmit} />)
    
        const { emailInput, ratingSelect, textArea, submitBtn } =
          getFormElements();
    
        await user.type(emailInput, 'test@example.com');
        await user.selectOptions(ratingSelect, '5');
        await user.type(textArea, 'Short');
        await user.click(submitBtn);
    
        expect(
          screen.getByText(/review must be at least 10 characters long/i)
        ).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    test('submit for with valid data', async () => {
        const user = userEvent.setup();
        render(<Form onSubmit={mockOnSubmit} />)
    
        const { emailInput, ratingSelect, textArea, submitBtn } =
          getFormElements();
    
        await user.type(emailInput, 'test@example.com');
        await user.selectOptions(ratingSelect, '5');
        await user.type(textArea, 'Shortfsdfdsfsdsddf');
        await user.click(submitBtn);
    
        expect(mockOnSubmit).toHaveBeenCalledOnce()
        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: 'test@example.com',
            rating: '5',
            text: 'Shortfsdfdsfsdsddf',
          });
      });
})