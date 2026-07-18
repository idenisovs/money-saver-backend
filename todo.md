# ToDo

1. The **Argv** module should be applied only against the new `config` module. 
   - The idea here is that by passing the CLI argument to **daemon** you can override the .ENV config value.
   - The defaults should be removed from Argv definition and set by `config` itself.