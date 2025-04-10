export const MiniCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-1 grow rounded-xl text-black bg-[#ddd]/20 p-3">
      <span className="">{data.mini_title}</span>
      <div className="w-auto flex items-center justify-between gap-2">
        <span className="text-3xl font-bold mb-2" style={{ color: data.color }}>
          ${data.value}
        </span>
        <span className="text-2xl font-bold px-4">
          {data.title && String(data.title).toUpperCase()}
        </span>
      </div>
      <span className="text-sm text-black/50">{data.mini_invoice}</span>
    </div>
  );
};
