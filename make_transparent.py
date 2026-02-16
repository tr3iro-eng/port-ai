
from PIL import Image
import sys

def convert_to_transparent(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If the pixel is black (or very close to it), make it transparent
            # Threshold for black: R<15, G<15, B<15
            if item[0] < 15 and item[1] < 15 and item[2] < 15:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully converted {input_path} to transparent: {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script.py input_path output_path")
    else:
        convert_to_transparent(sys.argv[1], sys.argv[2])
