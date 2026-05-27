
# Advertisement Blocklists 

## Functional requirements
- Upload a file (json or yaml) with words (standard format of desired and undesired)
- Build the table with the words from the file
    - The user can start filling the table manually, without a file.
- There is an option to refine the words in the table using AI.
- The user can manually refine the table (before and after the AI refinement) by adding or removing words.
- Refinement mode can be enabled and disabled:
    - Both list of words can be edited.
    - It has to be enabled in order to manually affect the table.
    - The words that are added are put into the list on top and highlighted.
    - The words that are removed are moved to the bottom of the list and highlighted with strike through line.
    - AI refinement cannot be performed while manual refinement is on.
- UI and Layout
    - The columns of the table of words can be resized manually
    - The words can be dragged and dropped to the other list.
- Data storage
    - I can save the edited and refined list to a database.
        - The list get stored in version: when a list is saved as edited, a new version is created.
    - I can find all the stored lists in a list view.
        - I can delete the lists
        - I can open edit view.

## Non functional requirements
- I can switch AI models. Design the AI layer decoupled.
