export const mockCustomer = {
  id: "c1a1a8a0-4c44-4f3e-9e61-d2a62d1bcd11",
  name: "Carlos Oliveira"
};

export const mockBranch = {
  id: "a7e1a5c3-6f4f-4412-8b99-71bb30d54c99",
  name: "Filial São Paulo"
};

export const mockProducts = [
  {
    id: "f3e3c8f1-5f01-4d4f-9f4d-12bb5566b1aa",
    name: "Monitor 27\" 4K",
    price: 1200.00
  },
  {
    id: "da8b1e9e-2334-4dc9-8b6a-5c27e8f5e33d",
    name: "Cabo HDMI 2m",
    price: 50.00
  },
  {
    id: "c9b2d3a1-1234-5678-9abc-def012345678",
    name: "Teclado Mecânico",
    price: 350.00
  },
  {
    id: "b8a7c6d5-9876-5432-1098-765432109876",
    name: "Mouse Gamer",
    price: 180.00
  }
];

export const generateSaleNumber = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Buscar o último número de venda do dia e incrementar
  const lastNumber = 1; // Aqui você poderia implementar uma lógica para buscar o último número
  const sequence = String(lastNumber).padStart(3, '0');
  
  return `S-${year}${month}${day}-${sequence}`;
}; 