import json

arr = []

seguir = True
while seguir:
    print('Ingresa 1 si quieres añadir una nueva palabra, de lo contrario ingresa enter')
    a = input()
    if a=="1":
        try:
            item = {"word": "", "meaning": "", "spanish": ""}
            item["word"] = input('word: ')
            meaning = input('meaning: ')
            if meaning[-1] != ".":
                meaning = meaning +"."
            item["meaning"] = meaning.capitalize()
            item["spanish"] = input('spanish: ')
            arr = arr + [item]
        except:
            print('Hubo un error al añadir la palabra')
    else:
        seguir = False
print(arr)
print('Ingresa 1 si deseas añadirlo al diccionario actual, de lo contrario ingresa enter')
b = input()
if b=="1":
    try:
        filename = "C:\\Users\\Lenovo\\Documents\\HTMLDevF\\Proyectos-personales\\Proyecto-palabras\\api\\words.json"
        with open(filename, "r") as file:
            data = json.load(file)
        for newWord in arr:
            data.append(newWord)
        with open(filename, "w") as file:
            json.dump(data, file)
        print('Se ha terminado de añadir')
    except:
        print('No se pudo agregar al diccionario')
else:
    print('El diccionario no ha sido modificado')
