import '@testing-library/jest-dom';
import { render, fireEvent } from '../test-utils';
import Filters from '../components/Filters';

describe('Filters component', () => {
    it('renders the dietary preference label', () => {
        const { getByLabelText } = render(<Filters onFilterChange={jest.fn()} />);
        const labelElement = getByLabelText(/dietary preference/i);
        expect(labelElement).toBeInTheDocument();
    });

    it('renders the correct select options', () => {
        const { getByLabelText } = render(<Filters onFilterChange={jest.fn()} />);
        const select = getByLabelText(/dietary preference/i) as HTMLSelectElement;
        const options = Array.from(select.options).map(opt => opt.value);
        expect(options).toEqual(['', 'vegan', 'gluten_free', 'vegetarian']);
    });

    it('calls onFilterChange with "vegan" when selected', () => {
        const onFilterChangeMock = jest.fn();
        const { getByLabelText } = render(<Filters onFilterChange={onFilterChangeMock} />);
        const select = getByLabelText(/dietary preference/i) as HTMLSelectElement;

        fireEvent.change(select, { target: { value: 'vegan' } });
        expect(onFilterChangeMock).toHaveBeenCalledWith({ dietaryPreference: 'vegan' });
    });

    it('calls onFilterChange with "gluten_free" when selected', () => {
        const onFilterChangeMock = jest.fn();
        const { getByLabelText } = render(<Filters onFilterChange={onFilterChangeMock} />);
        const select = getByLabelText(/dietary preference/i) as HTMLSelectElement;

        fireEvent.change(select, { target: { value: 'gluten_free' } });
        expect(onFilterChangeMock).toHaveBeenCalledWith({ dietaryPreference: 'gluten_free' });
    });

    it('calls onFilterChange with "vegetarian" when selected', () => {
        const onFilterChangeMock = jest.fn();
        const { getByLabelText } = render(<Filters onFilterChange={onFilterChangeMock} />);
        const select = getByLabelText(/dietary preference/i) as HTMLSelectElement;

        fireEvent.change(select, { target: { value: 'vegetarian' } });
        expect(onFilterChangeMock).toHaveBeenCalledWith({ dietaryPreference: 'vegetarian' });
    });

    it('calls onFilterChange with "" when All is selected', () => {
        const onFilterChangeMock = jest.fn();
        const { getByLabelText } = render(<Filters onFilterChange={onFilterChangeMock} />);
        const select = getByLabelText(/dietary preference/i) as HTMLSelectElement;

        // Re-selecting "All" to trigger the event
        fireEvent.change(select, { target: { value: '' } });
        expect(onFilterChangeMock).toHaveBeenCalledWith({ dietaryPreference: '' });
    });
});
