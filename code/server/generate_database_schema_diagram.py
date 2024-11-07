from sqlalchemy_schemadisplay import create_schema_graph
from sqlalchemy import MetaData
from app import create_app, db

def generate_schema_diagram():
    # Create an app context
    app = create_app()
    with app.app_context():
        # Generate the schema graph
        graph = create_schema_graph(
            metadata=db.metadata,
            engine=db.engine,
            show_datatypes=True,
            show_indexes=True,
            rankdir="LR",
            concentrate=True
        )

        # Save the diagram to a file
        graph.write_png("./data-files/database_schema_diagram.png")
        print("Database schema diagram generated as 'database_schema_diagram.png'")

generate_schema_diagram()