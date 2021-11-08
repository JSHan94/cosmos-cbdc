package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreateCbdc{}, "dpnm/CreateCbdc", nil)
	cdc.RegisterConcrete(&MsgUpdateCbdc{}, "dpnm/UpdateCbdc", nil)
	cdc.RegisterConcrete(&MsgDeleteCbdc{}, "dpnm/DeleteCbdc", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateCbdc{},
		&MsgUpdateCbdc{},
		&MsgDeleteCbdc{},
	)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)
