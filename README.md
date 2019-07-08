# Program Tile


## Część 1 

Za pomocą HTML i CSS do zrobioenia: 
	
    obrazek
	gradient na obrazku
	logo stacji
	tytył programu
	nazwa kanału i godzina rozpoczęcia
	kategoria programu
	zwróć uwagę na zaokroglenia
	
## Część 2

Dalej za pomocą HTML/CSS do zrobienia:

    po obrazkiem animacja progress baru (1px wysokości, 100% szerokości, do użycia animacja css)
    animacja bez powtórzeń
    kolor wypełnienia czerwony
    stworzyć merge request

## Część 3

Hello JavaScript:

	zamimplamentować badge z timerem olicząjącym ile minut zostało do rozpoczęcia programu:
	- funkcja przyyjmuje start (timestamp)
	- plakietka pojawia się, gdy do rozpoczęcia programu jest >= 10 min'
	- na plakietce czas do rozpoczecia programu jest pokazywany z dokładnościa co do minuty
	- jeżeli program juz się rozpoczął na plakietce pojawia się napis 'trwa'
	- na plakiecte widnieje napis `Start za: x min`
	- Pierwsze dwa elementy zawsze powinny odliczać od 2 minut, pozostałe od 5

## Część 4

JavaScript everywhere:
 
    
    zaimplementować progress bar, tak aby odzwierciedlał prawdziwy progress, czyli:
    - progress bar ma nie być wyświetlany, gdy program nie trwa
    - w momencie gdy program trwa - wyświetlamy
    progress bar powinien odzwierciedlać aktualny progress programu 
        (czyli jeśli program trwa 1h, to jak już jest 30 minut to progress jest w połowie)
        
    najlepiej, aby wszystkie programy zamienić na obiekt (np. { title: '', startTime: '2018-06-06 12:30', endTime: startTime: '2018-06-06 13:30', //itd... })
    CZYLI:
        !!! wyrenderuj HTML, na podstawie listy obiektów !!!!
    