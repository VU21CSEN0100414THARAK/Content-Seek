# Content-Seek

The core idea of this project is to create a web-based application that allows users to perform targeted searches for various types of content (text, PPTs, PDFs, and images) using both text input and voice commands. 
The application also includes features for speech synthesis, enhancing accessibility by providing voice feedback for search results.

## Features

- **Text Input for Search:** An input field allows users to enter their search queries.
- **Voice Recognition Button:** A microphone button enables users to use voice commands for entering search queries.
- **Voice Output Control:** A button to toggle speech synthesis, which reads out the results to the user.
- **Submit Button:** Submits the search query for processing.

![Text Input](https://github.com/user-attachments/assets/91fadde3-c64e-45da-becf-66d682a44e91)

## Definition Box

- **Text Display:** Displays a text description of the search query fetched from an external API (Wikipedia summary).

![Definition Box](https://github.com/user-attachments/assets/d465e366-4f4d-4921-b5dc-5eeb60afa158)

## Search Results

### Reference Links

A list of search results is displayed with clickable links.

![Reference Links](https://github.com/user-attachments/assets/df071a85-a7e4-49d6-907a-56b1428f36bc)

### Image Results

A grid layout displays image search results.

![Image Results](https://github.com/user-attachments/assets/e427faef-969e-4da2-aa33-1e6a11bdc2a7)

### PDF Results

A list of search results is displayed with PDFs.

![PDF Results](https://github.com/user-attachments/assets/31297595-1161-4720-92da-494f51a58ff4)

### PPT Results

A list of search results is displayed with PPTs.

![PPT Results](https://github.com/user-attachments/assets/b1ad7f87-b884-4bba-b83a-a672dbc84eba)

## JavaScript Functionalities

- **Voice Recognition:** Uses the Web Speech API to convert spoken words into text, which is then used as the search query.
- **Speech Synthesis:** Converts text descriptions and search results into spoken words using the Speech Synthesis API, making the application more accessible.
- **Animated Header:** Utilizes the Anime.js library to animate the header text for a dynamic user experience.
- **Search Handling:** Fetches search results from the Google Custom Search API, filtering results based on the selected file type (text, PPT, PDF, images).
- **Typewriter Effect:** Displays text descriptions with a typewriter animation effect for improved readability and engagement.

## Note

Make sure to update with your API key and search engine ID in the JavaScript code to use the application.

![Screenshot](https://github.com/user-attachments/assets/6b9d185c-d589-4913-969a-e619874113de)

## Summary

The Content-Seek project is an innovative solution aimed at improving the search experience by combining traditional text input with modern voice recognition and speech synthesis technologies.
It is designed to be user-friendly, accessible, and versatile, making it a valuable tool for users seeking diverse types of content on the web.







