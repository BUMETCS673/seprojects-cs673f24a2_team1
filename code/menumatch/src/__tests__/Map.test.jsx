import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../pages/Map';

describe('Map Component', () => {
  beforeEach(() => {
    render(<Map />);
  });

  test('renders the header', () => {
    const headerElement = screen.getByText(/Header/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the map image', () => {
    const mapImage = screen.getByAltText('map_image');
    expect(mapImage).toBeInTheDocument();
  });

  test('renders all restaurant cards', () => {
    const restaurantCards = screen.getAllByRole('img');
    expect(restaurantCards).toHaveLength(4); // 1 map image + 3 restaurant images
  });

  test('renders restaurant names and demographics', () => {
    const restaurantNames = screen.getAllByText(/Restaurant 1/i);
    const restaurantDemographics = screen.getAllByText(/Location \|/i);

    expect(restaurantNames).toHaveLength(3);
    expect(restaurantDemographics).toHaveLength(3);
  });
});
