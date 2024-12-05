import os
from app.models import Restaurant, Review

def test_update_restaurants(client, db_session, tmp_path):
    # Create a sample CSV
    csv_file = tmp_path / "restaurants.csv"
    csv_file.write_text("place_id,name,address,phone_number,rating,vegan_ratings,gf_ratings,veg_ratings\n"
                        "1,Test Restaurant,123 Test St,1234567890,4.5,4.0,4.2,4.3")

    # Upload the CSV
    with open(csv_file, 'rb') as f:
        response = client.post('/api/manage/update-restaurants', data={'file': f}, content_type='multipart/form-data')

    print(response.json)
    assert response.status_code == 200
    assert response.json['STATUS'] == 'SUCCESS'
    assert response.json['Restaurants Added'] == 1

def test_update_reviews(client, db_session, tmp_path):
    # Create a sample CSV
    csv_file = tmp_path / "reviews.csv"
    csv_file.write_text("place_id,rating,review_text\n1,5,Excellent!")

    # Add a test restaurant
    db_session.session.add(Restaurant(place_id="1", name="Review Restaurant"))
    db_session.session.commit()

    # Upload the CSV
    with open(csv_file, 'rb') as f:
        response = client.post('/api/manage/update-reviews', data={'file': f}, content_type='multipart/form-data')

    assert response.status_code == 200
    assert response.json['STATUS'] == 'SUCCESS'
    assert response.json['Reviews Added'] == 1

def test_delete_all_restaurants(client, db_session):
    # Add test data
    db_session.session.add(Restaurant(name="Deletable Restaurant"))
    db_session.session.commit()

    # Test deletion of all restaurants
    response = client.post('/api/manage/delete-all-restaurants')
    assert response.status_code == 200
    assert response.json['STATUS'] == 'SUCCESS'
    assert response.json['Restaurants Deleted'] > 0

def test_delete_all_reviews(client, db_session):
    # Add test data
    restaurant = Restaurant(name="Deletable Review Restaurant")
    db_session.session.add(restaurant)
    db_session.session.commit()

    review = Review(restaurant_id=restaurant.restaurant_id, rating=4.5, review_text="Good!")
    db_session.session.add(review)
    db_session.session.commit()

    # Test deletion of all reviews
    response = client.post('/api/manage/delete-all-reviews')
    assert response.status_code == 200
    assert response.json['STATUS'] == 'SUCCESS'
    assert response.json['Reviews Deleted'] > 0
