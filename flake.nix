{
  description = "inalone blog flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs }: 
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in 
  {
    devShells.${system}.default = 
      pkgs.mkShell
        {
	  buildInputs = with pkgs; [
	    hugo
	    nodePackages.vscode-langservers-extracted
	    nodePackages.prettier
	  ];
	};
  };
}
