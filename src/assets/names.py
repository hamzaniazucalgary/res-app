import os

# List of image file extensions
image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']

# Get the current directory
current_directory = os.getcwd()

# Iterate through files in the current directory
for file_name in os.listdir(current_directory):
    # Check if the file is an image based on its extension
    if any(file_name.lower().endswith(ext) for ext in image_extensions):
        print(file_name)
